import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { createRequire } from 'node:module';

// Renderiza cada slide de um deck em PNG (dist/previews/<deck>/slide.NNN.png)
// para revisão visual rápida antes de exportar o PDF.
// Uso: npm run preview -- --input slides/decks/seu-deck.md

const args = process.argv.slice(2);
const inputIndex = args.indexOf('--input');
const input = inputIndex >= 0 ? args[inputIndex + 1] : 'slides/template.md';
const file = path.resolve(input || 'slides/template.md');

if (!fs.existsSync(file)) {
  console.error(`Arquivo não encontrado: ${input}`);
  process.exit(1);
}

const require = createRequire(import.meta.url);
const marpBin = path.join(
  path.dirname(require.resolve('@marp-team/marp-cli/package.json')),
  'marp-cli.js',
);

const outDir = path.resolve('dist', 'previews', path.basename(file, path.extname(file)));
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const result = spawnSync(
  process.execPath,
  [
    marpBin,
    file,
    '--html',
    '--allow-local-files',
    '--images',
    'png',
    '--output',
    path.join(outDir, 'slide.png'),
  ],
  { stdio: 'inherit' },
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

const count = fs.readdirSync(outDir).filter((name) => name.endsWith('.png')).length;
console.log(
  `\n${count} slides renderizados em ${path.relative(process.cwd(), outDir).replaceAll('\\', '/')}`,
);
