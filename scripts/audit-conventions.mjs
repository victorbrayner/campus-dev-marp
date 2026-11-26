import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

// Auditoria de convenções do projeto: vocabulário de condução, rodapé,
// byline e blocos de fecho de aula. Complementa validate/audit:assets/audit:visual.

const root = process.cwd();
const decksDir = path.join(root, 'slides', 'decks');
const inputArgs = process.argv.slice(2);
const files = inputArgs.length
  ? inputArgs.map((input) => path.resolve(root, input))
  : fs
      .readdirSync(decksDir, { recursive: true })
      .filter((name) => name.endsWith('.md') && !/README|Briefings|Roteiros/.test(name))
      .map((name) => path.join(decksDir, name));

const relative = (file) => path.relative(root, file).replaceAll('\\', '/');

const issues = [];
const add = (file, severity, message) => {
  issues.push({ file: relative(file), severity, message });
};

const FORBIDDEN = [
  ['duplas', /\bduplas\b/i],
  ['gabarito', /\bgabarito\b/i],
  ['minutagem', /\bminutagem\b/i],
  ['resposta esperada', /resposta esperada/i],
  ['verificação oral', /verificaç(ão|ões) oral(is)?/i],
  ['para a turma', /para a turma/i],
  ['socialização/socializar', /socializa(r|ç(ão|ões))/i],
];

const BLOCKS = [
  ['ATIVIDADE', /ATIVIDADE/],
  ['AUTOVERIFICAÇÃO', /AUTOVERIFICAÇÃO/],
  ['REFERÊNCIAS', /REFERÊNCIAS/],
  ['SÍNTESE', /SÍNTESE/],
];

for (const file of files) {
  if (!fs.existsSync(file)) {
    add(file, 'error', 'arquivo não encontrado.');
    continue;
  }

  const source = fs.readFileSync(file, 'utf8');
  const frontMatterMatch = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!frontMatterMatch) {
    add(file, 'error', 'front matter YAML ausente.');
    continue;
  }

  const frontMatter = frontMatterMatch[1];
  const body = source.slice(frontMatterMatch[0].length);
  const bodyWithoutComments = body.replace(/<!--[\s\S]*?-->/g, '');

  const footer = (frontMatter.match(/^footer:\s*['"]?(.+?)['"]?\s*$/m)?.[1] ?? '').trim();
  if (!footer) {
    add(file, 'error', 'front matter sem footer.');
  } else if (!/·\s*UNIDADE\s+(I|II|III)\b/i.test(footer)) {
    add(file, 'error', `footer fora do padrão "DISCIPLINA · UNIDADE X": "${footer}".`);
  }

  if (!/<strong>Prof\. Victor Brayner<\/strong>/.test(body)) {
    add(file, 'error', 'byline sem "Prof. Victor Brayner".');
  } else {
    const bylineSpan = body.match(/<span>([^<]*)<\/span>/)?.[1] ?? '';
    if (!/2026\.2|período/i.test(bylineSpan)) {
      add(file, 'warning', `byline com semestre fora do padrão: "${bylineSpan}".`);
    }
  }

  const eyebrow = bodyWithoutComments.match(/<div class="eyebrow">([^<]*)<\/div>/)?.[1] ?? '';
  if (!/AULA\s+\d+/i.test(eyebrow)) {
    add(file, 'warning', 'slide de abertura sem eyebrow "DISCIPLINA · AULA NN".');
  }

  for (const [name, pattern] of FORBIDDEN) {
    if (pattern.test(bodyWithoutComments)) {
      add(file, 'error', `vocabulário de condução no slide: "${name}".`);
    }
  }

  for (const [name, pattern] of BLOCKS) {
    if (!pattern.test(bodyWithoutComments)) {
      add(file, 'warning', `estrutura de fecho ausente: ${name}.`);
    }
  }
}

for (const issue of issues) {
  const label = issue.severity === 'error' ? 'ERRO ' : 'AVISO';
  console[issue.severity === 'error' ? 'error' : 'warn'](`${label} ${issue.file}: ${issue.message}`);
}

const errors = issues.filter((issue) => issue.severity === 'error');
const warnings = issues.filter((issue) => issue.severity === 'warning');
console.log(`\n${files.length} arquivos | ${errors.length} erro(s) | ${warnings.length} aviso(s)`);
if (errors.length) process.exitCode = 1;
