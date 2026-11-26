import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const args = process.argv.slice(2);
const formatIndex = args.indexOf('--format');
const format = formatIndex >= 0 ? args[formatIndex + 1] : 'html';
const inputIndex = args.indexOf('--input');
const input = inputIndex >= 0 ? args[inputIndex + 1] : 'slides/template.md';
const supported = new Set(['html', 'pdf', 'pptx']);

if (!supported.has(format)) {
  console.error(`Formato inválido: ${format}. Use html, pdf ou pptx.`);
  process.exit(1);
}

const inputPath = path.resolve(input);
// Decks em slides/decks/<disciplina>/ exportam para dist/<disciplina>/;
// arquivos fora de slides/decks/ (ex.: slides/template.md) ficam em dist/.
const decksDir = path.resolve('slides', 'decks');
const relative = path.relative(decksDir, inputPath);
const insideDecks =
  relative !== '' &&
  !relative.startsWith('..') &&
  !path.isAbsolute(relative) &&
  relative.split(path.sep).length > 1;
const outputDir = insideDecks
  ? path.resolve('dist', relative.split(path.sep)[0])
  : path.resolve('dist');
fs.mkdirSync(outputDir, { recursive: true });
const output = path.join(
  outputDir,
  `${path.basename(inputPath, path.extname(inputPath))}.${format}`,
);
const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
// --html is required for inline HTML/SVG in the PDF/PNG/PPTX renderer;
// the front-matter `html: true` alone is not enough for inline SVG.
const cliArgs = ['@marp-team/marp-cli', input, '--output', output, '--html'];
if (format === 'pdf') cliArgs.push('--pdf', '--allow-local-files');
if (format === 'pptx') cliArgs.push('--pptx', '--allow-local-files');

const result = spawnSync(npx, cliArgs, {
  stdio: 'inherit',
  shell: process.platform === 'win32',
});
if (result.error) {
  console.error(`Não foi possível executar Marp CLI: ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
