import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import puppeteer from 'puppeteer-core';

const root = process.cwd();
const decksDir = path.join(root, 'slides', 'decks');
const template = path.join(root, 'slides', 'template.md');
const inputArgs = process.argv.slice(2);
const files = inputArgs.length
  ? inputArgs.map((input) => path.resolve(root, input))
  : [
      template,
      ...fs.readdirSync(decksDir)
        .filter((name) => name.endsWith('.md') && !/README|Briefings|Roteiros/.test(name))
        .map((name) => path.join(decksDir, name)),
    ];

const MIN_FONT = 12;
const CONTENT = { left: 68, right: 1212, top: 56, bottom: 670 };
const SLIDE_CENTER = 640;
const FONT_SCALE = {
  twoCol: 15,
  notice: 14,
  noticeTitle: 12,
  panel: 14,
  callout: 14.5,
};
const require = createRequire(import.meta.url);
const marpBin = path.join(
  path.dirname(require.resolve('@marp-team/marp-cli/package.json')),
  'marp-cli.js',
);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'campus-visual-'));

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    `${process.env.LOCALAPPDATA}/Google/Chrome/Application/chrome.exe`,
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);
  const found = candidates.find((candidate) => fs.existsSync(candidate));
  if (!found) {
    throw new Error('Chrome não encontrado. Defina CHROME_PATH com o executável.');
  }
  return found;
}

const relative = (file) => path.relative(root, file).replaceAll('\\', '/');
const round = (value) => Math.round(value);

const issues = [];
const add = (file, severity, slide, message) => {
  issues.push({ file: relative(file), severity, slide, message });
};

const browser = await puppeteer.launch({
  executablePath: findChrome(),
  headless: 'new',
  args: ['--no-sandbox', '--allow-file-access-from-files'],
});

let totalSlides = 0;

for (const [index, file] of files.entries()) {
  if (!fs.existsSync(file)) {
    add(file, 'error', 0, 'arquivo não encontrado.');
    continue;
  }

  const html = path.join(tmp, `${index}-${path.basename(file, '.md')}.html`);
  const conversion = spawnSync(
    process.execPath,
    [marpBin, file, '--html', '--allow-local-files', '--output', html],
    { cwd: root, encoding: 'utf8' },
  );

  if (conversion.status !== 0 || !fs.existsSync(html)) {
    add(file, 'error', 0, 'falha ao exportar HTML para a auditoria.');
    continue;
  }

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(`file:///${html.replaceAll('\\', '/')}`, { waitUntil: 'networkidle0' });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([
      document.fonts.load('400 20px Carlito'),
      document.fonts.load('700 20px Carlito'),
      document.fonts.load('700 20px Oswald'),
      document.fonts.load('400 20px "Roboto Mono"'),
      document.fonts.load('700 20px "Roboto Mono"'),
    ]);
  });

  const fonts = await page.evaluate(() => ({
    carlito400: document.fonts.check('400 20px Carlito'),
    carlito700: document.fonts.check('700 20px Carlito'),
    oswald: document.fonts.check('700 20px Oswald'),
    mono400: document.fonts.check('400 20px "Roboto Mono"'),
    mono700: document.fonts.check('700 20px "Roboto Mono"'),
  }));
  for (const [font, ok] of Object.entries(fonts)) {
    if (!ok) add(file, 'error', 0, `fonte não carregou: ${font}.`);
  }

  const audit = await page.evaluate(
    ({ CONTENT, SLIDE_CENTER, FONT_SCALE, MIN_FONT, checkDensity }) => {
      const out = [];
      const round = (value) => Math.round(value);
      const add = (severity, slide, message) => out.push({ severity, slide, message });
      const sections = [...document.querySelectorAll('section')];
      let pageNumberChecked = false;

      sections.forEach((section, index) => {
        const slide = index + 1;
        const sr = section.getBoundingClientRect();
        const scale = sr.width / 1280 || 1;
        const box = (el) => {
          const r = el.getBoundingClientRect();
          return {
            left: (r.left - sr.left) / scale,
            top: (r.top - sr.top) / scale,
            right: (r.right - sr.left) / scale,
            bottom: (r.bottom - sr.top) / scale,
            width: r.width / scale,
            height: r.height / scale,
          };
        };
        const visible = (el) => {
          if (el.closest('footer')) return false;
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) === 0) return false;
          const r = el.getBoundingClientRect();
          return r.width >= 1 && r.height >= 1;
        };

        const leafText = [...section.querySelectorAll('*')].filter((el) => {
          if (!visible(el)) return false;
          const hasText = [...el.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim());
          if (!hasText) return false;
          const hasTextChild = [...el.children].some((child) =>
            [...child.childNodes].some((node) => node.nodeType === 3 && node.textContent.trim()),
          );
          return !hasTextChild;
        });

        for (const el of leafText) {
          const b = box(el);
          const text = (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 42);
          if (b.bottom > CONTENT.bottom + 0.6) {
            add('error', slide, `texto abaixo da área útil (${round(b.bottom)} > ${CONTENT.bottom}): "${text}"`);
          }
          if (b.right > CONTENT.right + 0.6) {
            add('error', slide, `texto à direita da área útil (${round(b.right)} > ${CONTENT.right}): "${text}"`);
          }
          if (b.left < CONTENT.left - 0.6) {
            add('error', slide, `texto à esquerda da área útil (${round(b.left)} < ${CONTENT.left}): "${text}"`);
          }
          if (b.top < CONTENT.top - 0.6) {
            add('error', slide, `texto acima da área útil (${round(b.top)} < ${CONTENT.top}): "${text}"`);
          }
        }

        for (const el of section.querySelectorAll('*')) {
          if (!visible(el)) continue;
          const cs = getComputedStyle(el);
          if (cs.overflow !== 'hidden' && cs.overflowY !== 'hidden') continue;
          if (el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2) {
            add('warning', slide, `conteúdo clipado em ${el.tagName.toLowerCase()}.`);
          }
        }

        for (const table of section.querySelectorAll('table')) {
          const t = box(table);
          if (t.right > CONTENT.right + 0.6 || t.left < CONTENT.left - 0.6) {
            add('error', slide, 'tabela fora da área útil.');
          }
          const rows = [...table.querySelectorAll('tbody tr')].map((row) => box(row).height);
          if (rows.some((height) => height > 70)) {
            add('warning', slide, `tabela com linha alta (${round(Math.max(...rows))}px); verifique o flex da tabela.`);
          }
        }

        const isTitle = /(^|\s)(title|section-divider)(\s|$)/.test(section.className);
        const h1 = section.querySelector('h1');
        if (h1 && !isTitle) {
          const cs = getComputedStyle(h1);
          const lineHeight = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
          const lines = h1.getBoundingClientRect().height / lineHeight;
          if (lines > 1.5) {
            add('warning', slide, `título em ${Math.round(lines)} linhas; prefira uma linha.`);
          }
        }

        // ---- densidade: vazio entre o conteúdo e o fecho (só decks) ----
        if (checkDensity && !isTitle) {
          const closerSelector =
            '.callout, .takeaway, .notice.closer, .panel.closer, .quote.closer';
          const closer = section.querySelector(closerSelector);
          const visualLeaves = [
            ...section.querySelectorAll(
              'svg, table, pre, img, .notice, .panel, .card, .node, .step, .stat, .quote',
            ),
          ];
          let contentBottom = 0;
          for (const el of [...leafText, ...visualLeaves]) {
            if (!visible(el)) continue;
            if (closer && el.closest(closerSelector)) continue;
            contentBottom = Math.max(contentBottom, box(el).bottom);
          }
          if (contentBottom > 0) {
            const gap = closer
              ? box(closer).top - contentBottom
              : CONTENT.bottom - contentBottom;
            if (gap > 250) {
              add(
                'warning',
                slide,
                `vazio de ${round(gap)}px entre o conteúdo e ${closer ? 'o fecho' : 'a base do slide'}; ` +
                  'acrescente uma terceira zona ou divida o slide.',
              );
            } else if (closer && gap < 8) {
              add(
                'warning',
                slide,
                `fecho colado ao conteúdo (${round(gap)}px); use .stack para espaçar.`,
              );
            }
          }
        }

        for (const twoCol of section.querySelectorAll('.two-col')) {
          for (const col of twoCol.querySelectorAll(':scope > .col')) {
            const paragraphs = [...col.children].filter(
              (el) => el.tagName === 'P' && !el.matches('.small,.tiny,.lead,.subtitle'),
            );
            const items = [...col.querySelectorAll(':scope > ul > li, :scope > ol > li')];
            const sizes = [
              ...paragraphs.map((el) => parseFloat(getComputedStyle(el).fontSize)),
              ...items.map((el) => parseFloat(getComputedStyle(el).fontSize)),
            ].filter((size) => Number.isFinite(size));
            if (!sizes.length) continue;
            if (sizes.some((size) => Math.abs(size - FONT_SCALE.twoCol) > 0.1)) {
              add('warning', slide, `two-col com corpo fora de ${FONT_SCALE.twoCol}px: ${sizes.join(', ')}px.`);
            }
            if (paragraphs.length && items.length) {
              const pSizes = paragraphs.map((el) => parseFloat(getComputedStyle(el).fontSize));
              const iSizes = items.map((el) => parseFloat(getComputedStyle(el).fontSize));
              const max = Math.max(...pSizes, ...iSizes);
              const min = Math.min(...pSizes, ...iSizes);
              if (max - min > 0.5) {
                add('warning', slide, `p e li com tamanhos diferentes no two-col (${min}px vs ${max}px).`);
              }
            }
          }
        }

        for (const notice of section.querySelectorAll('.notice')) {
          const size = parseFloat(getComputedStyle(notice).fontSize);
          if (Math.abs(size - FONT_SCALE.notice) > 0.1) {
            add('warning', slide, `notice com corpo ${size}px; esperado ${FONT_SCALE.notice}px.`);
          }
        }
        for (const title of section.querySelectorAll('.notice-title')) {
          const size = parseFloat(getComputedStyle(title).fontSize);
          if (Math.abs(size - FONT_SCALE.noticeTitle) > 0.1) {
            add('warning', slide, `notice-title com ${size}px; esperado ${FONT_SCALE.noticeTitle}px.`);
          }
        }
        for (const panel of section.querySelectorAll('.panel')) {
          const size = parseFloat(getComputedStyle(panel).fontSize);
          if (Math.abs(size - FONT_SCALE.panel) > 0.1) {
            add('warning', slide, `panel com corpo ${size}px; esperado ${FONT_SCALE.panel}px.`);
          }
        }
        for (const callout of section.querySelectorAll('.callout')) {
          const size = parseFloat(getComputedStyle(callout).fontSize);
          if (Math.abs(size - FONT_SCALE.callout) > 0.1) {
            add('warning', slide, `callout com corpo ${size}px; esperado ${FONT_SCALE.callout}px.`);
          }
        }

        if (section.classList.contains('section-divider')) {
          const topics = [...section.querySelectorAll('.topic')];
          if (topics.length) {
            const left = Math.min(...topics.map((el) => box(el).left));
            const right = Math.max(...topics.map((el) => box(el).right));
            const center = (left + right) / 2;
            if (Math.abs(center - SLIDE_CENTER) > 2) {
              add('warning', slide, `tópicos fora do centro (${round(center)} vs ${SLIDE_CENTER}).`);
            }
          }
        }

        for (const size of section.querySelectorAll('svg text')) {
          const fontSize = parseFloat(getComputedStyle(size).fontSize);
          if (Number.isFinite(fontSize) && fontSize < MIN_FONT) {
            add('warning', slide, `texto de SVG com ${fontSize}px; mínimo ${MIN_FONT}px.`);
          }
        }

        if (!pageNumberChecked) {
          const after = getComputedStyle(section, '::after');
          if (after.content !== 'none' && after.padding !== '0px') {
            add('warning', slide, `paginação com padding "${after.padding}"; esperado 0px.`);
          }
          pageNumberChecked = true;
        }
      });

      return out;
    },
    {
      CONTENT,
      SLIDE_CENTER,
      FONT_SCALE,
      MIN_FONT,
      checkDensity: relative(file).startsWith('slides/decks/'),
    },
  );

  for (const issue of audit) add(file, issue.severity, issue.slide, issue.message);
  totalSlides += await page.evaluate(() => document.querySelectorAll('section').length);
  await page.close();
}

await browser.close();
fs.rmSync(tmp, { recursive: true, force: true });

const errors = issues.filter((issue) => issue.severity === 'error');
const warnings = issues.filter((issue) => issue.severity === 'warning');

for (const issue of issues) {
  const label = issue.severity === 'error' ? 'ERRO ' : 'AVISO';
  const slide = issue.slide ? ` slide ${issue.slide}` : '';
  console[issue.severity === 'error' ? 'error' : 'warn'](`${label} ${issue.file}${slide}: ${issue.message}`);
}

console.log(
  `\n${files.length} arquivos | ${totalSlides} slides | ${errors.length} erro(s) | ${warnings.length} aviso(s)`,
);
if (errors.length) process.exitCode = 1;
