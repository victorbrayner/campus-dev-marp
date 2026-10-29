import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const args = process.argv.slice(2);
const inputIndex = args.indexOf('--input');
const input = inputIndex >= 0 ? args[inputIndex + 1] : 'slides/template.md';
const file = path.resolve(root, input || 'slides/template.md');
const errors = [];
const warnings = [];

const fail = (message) => errors.push(message);
const warn = (message) => warnings.push(message);
const relative = (value) => path.relative(root, value).replaceAll('\\', '/');

if (!fs.existsSync(file)) {
  fail(`Arquivo não encontrado: ${input}`);
  finish();
}

const source = fs.readFileSync(file, 'utf8');
const themeFile = path.join(root, 'themes', 'campus-dev.css');
const theme = fs.readFileSync(themeFile, 'utf8');

const frontMatterMatch = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
if (!frontMatterMatch) {
  fail('Front matter YAML ausente ou inválido.');
} else {
  const frontMatter = frontMatterMatch[1];
  for (const key of ['marp', 'theme', 'size', 'paginate', 'html']) {
    if (!new RegExp(`^${key}:`, 'm').test(frontMatter)) fail(`Front matter sem "${key}".`);
  }
  if (!/^theme:\s*campus-dev\s*$/m.test(frontMatter)) fail('O tema deve ser campus-dev.');
  if (!/^size:\s*16:9\s*$/m.test(frontMatter)) fail('O deck deve usar size: 16:9.');
}

const body = frontMatterMatch ? source.slice(frontMatterMatch[0].length) : source;
const slides = body.split(/^---\s*$/m).filter((slide) => slide.trim());
if (slides.length === 0) fail('Nenhum slide encontrado.');

const cssClasses = new Set();
const themeWithoutComments = theme.replace(/\/\*[\s\S]*?\*\//g, '');
for (const match of themeWithoutComments.matchAll(/([^{}]+)\{/g)) {
  for (const classMatch of match[1].matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)) cssClasses.add(classMatch[1]);
}
const allowedBuiltIns = new Set(['marp', 'language-python', 'language-javascript', 'language-typescript', 'hljs']);
const usedClasses = new Set();
for (const match of body.matchAll(/class\s*=\s*["']([^"']+)["']/g)) {
  for (const name of match[1].split(/\s+/)) if (name) usedClasses.add(name);
}
for (const match of body.matchAll(/^\s*<!--\s*_class:\s*([^>\n]+?)\s*-->\s*$/gm)) {
  for (const name of match[1].trim().split(/\s+/)) if (name) usedClasses.add(name);
}
for (const name of usedClasses) {
  if (!cssClasses.has(name) && !allowedBuiltIns.has(name)) fail(`Classe não encontrada no tema: .${name}`);
}

const bodyWithoutComments = body.replace(/<!--[\s\S]*?-->/g, '');
for (const match of bodyWithoutComments.matchAll(/<img\b[^>]*>/gi)) {
  const tag = match[0];
  const src = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1];
  if (!src) {
    fail('Imagem sem atributo src.');
    continue;
  }
  if (!/\balt\s*=\s*["'][^"']*["']/i.test(tag)) fail(`Imagem sem alt: ${src}`);
  if (/^(https?:)?\/\//i.test(src)) {
    fail(`Imagem remota não permitida: ${src}`);
    continue;
  }
  if (!src.startsWith('data:') && !src.startsWith('#')) {
    const asset = path.resolve(path.dirname(file), src);
    if (!fs.existsSync(asset)) fail(`Asset não encontrado: ${src}`);
  }
}

for (const match of body.matchAll(/--value\s*:\s*([\d.]+)%/g)) {
  const value = Number(match[1]);
  if (value < 0 || value > 100) fail(`Valor --value fora de 0–100%: ${value}%`);
}

const remoteImages = bodyWithoutComments.match(/(?:https?:)?\/\/[^\s"')>]+/gi) ?? [];
for (const url of remoteImages) {
  if (/dummyimage|\.png|\.jpe?g|\.gif|\.webp|\.svg/i.test(url)) fail(`Imagem remota não permitida: ${url}`);
}

const placeholders = [
  ...body.matchAll(/\b(?:TODO|PLACEHOLDER)\b/g),
  ...body.matchAll(/Lorem ipsum/gi),
];
if (placeholders.length) warn(`${placeholders.length} placeholder(s) textual(is) encontrado(s). Use [DADO NECESSÁRIO] quando for intencional.`);

const labels = [...body.matchAll(/^\s*\d+\s+·\s+([^\n]+)$/gm)].map((match) => match[1].trim());
if (new Set(labels).size !== labels.length) warn('Há rótulos numéricos de slides repetidos no catálogo.');

// ---- diretrizes de variedade e composição ----
const contentSlides = slides.filter(
  (slide) => !/<!--\s*_class:\s*[^>]*\b(title|section-divider)\b/.test(slide),
);

if (contentSlides.length > 0) {
  const calloutSlides = contentSlides.filter((slide) => /class="[^"]*\bcallout\b/.test(slide));
  const calloutRatio = calloutSlides.length / contentSlides.length;
  if (calloutRatio > 0.5) {
    warn(
      `Callout em ${calloutSlides.length}/${contentSlides.length} slides (${Math.round(calloutRatio * 100)}%). ` +
        'A diretriz é ~40%; varie com notice, panel, quote ou nenhum fecho.',
    );
  }

  let run = 0;
  let maxRun = 0;
  for (const slide of slides) {
    if (/<!--\s*_class:\s*[^>]*\b(title|section-divider)\b/.test(slide)) {
      run = 0;
      continue;
    }
    if (/class="[^"]*\bcallout\b/.test(slide)) {
      run++;
      maxRun = Math.max(maxRun, run);
    } else {
      run = 0;
    }
  }
  if (maxRun >= 3) warn(`${maxRun} callouts seguidos. Alterne o fecho ou insira um divisor.`);

  const twoColSlides = contentSlides.filter((slide) => /class="[^"]*\btwo-col\b/.test(slide));
  const twoColRatio = twoColSlides.length / contentSlides.length;
  if (twoColRatio > 0.6) {
    warn(
      `Two-col em ${twoColSlides.length}/${contentSlides.length} slides (${Math.round(twoColRatio * 100)}%). ` +
        'Alterne com cards, tabela, flow, código ou quote.',
    );
  }
}

for (const [index, slide] of slides.entries()) {
  if (/<!--\s*_class:\s*[^>]*\b(title|section-divider)\b/.test(slide)) continue;
  const title = slide.match(/^\s*#\s+(.+)$/m);
  if (title && title[1].trim().length > 55) {
    warn(
      `Slide ${index + 1}: título com ${title[1].trim().length} caracteres. ` +
        'Prefira até 55 para caber em uma linha.',
    );
  }
}

const inlineStyles = [...body.matchAll(/<!--\s*_style:\s*["']([^"']*)["']\s*-->/g)];
const layoutStyle = inlineStyles.find((match) =>
  /\b(margin|padding|font|line-height|letter-spacing|position|top|bottom|left|right|width|height|display|flex|gap|justify|align)\b/i.test(
    match[1],
  ),
);
if (layoutStyle) {
  warn(
    'Uso de _style para layout ou tipografia. Prefira classes do tema; ' +
      'reserve _style para destaque de dados no próprio slide.',
  );
}

for (const [index, slide] of slides.entries()) {
  const lines = slide.split('\n');
  for (let i = 0; i < lines.length - 1; i++) {
    if (!/^\s*\|.*\|\s*$/.test(lines[i])) continue;
    if (!/^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) continue;
    const cells = lines[i]
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((cell) => cell.trim());
    if (cells[0] === '') {
      warn(`Slide ${index + 1}: tabela sem rótulo na primeira coluna.`);
      break;
    }
  }
}

if (warnings.length) {
  console.warn(`\nAvisos em ${relative(file)}:`);
  for (const message of warnings) console.warn(`- ${message}`);
}
if (errors.length) {
  console.error(`\nFalhas em ${relative(file)}:`);
  for (const message of errors) console.error(`- ${message}`);
  process.exitCode = 1;
} else {
  console.log(`OK: ${relative(file)} (${slides.length} slides, ${usedClasses.size} classes verificadas)`);
}

function finish() {
  if (errors.length) {
    for (const message of errors) console.error(`- ${message}`);
    process.exit(1);
  }
}
