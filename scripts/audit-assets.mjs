import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

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

const existingFiles = [];
for (const file of files) {
  if (!fs.existsSync(file)) {
    console.error(`ERRO  arquivo não encontrado: ${path.relative(root, file).replaceAll('\\', '/')}`);
    process.exitCode = 1;
    continue;
  }
  existingFiles.push(file);
}

const relative = (file) => path.relative(root, file).replaceAll('\\', '/');
let errors = 0;
let warnings = 0;

const fail = (file, message) => {
  errors++;
  console.error(`ERRO  ${relative(file)}: ${message}`);
};
const warn = (file, message) => {
  warnings++;
  console.warn(`AVISO ${relative(file)}: ${message}`);
};

for (const file of existingFiles) {
  // Comments may contain usage examples (e.g. <img ...>), not real figures.
  const source = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');

  // External raster/photos in content figures.
  for (const match of source.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const src = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1];
    if (!src) {
      fail(file, 'imagem sem src.');
      continue;
    }
    if (!/\balt\s*=\s*["'][^"']*["']/i.test(tag)) fail(file, `imagem sem alt: ${src}`);
    if (/^(https?:)?\/\//i.test(src)) {
      fail(file, `imagem remota não permitida: ${src}`);
      continue;
    }
    if (src.startsWith('data:')) continue;
    const asset = path.resolve(path.dirname(file), src);
    if (!fs.existsSync(asset)) {
      fail(file, `asset não encontrado: ${src}`);
      continue;
    }
    if (/\.(png|jpe?g|gif|webp|bmp)$/i.test(src)) {
      warn(file, `raster em imagem de conteúdo (${src}). Prefira SVG inline para diagramas.`);
    }
  }

  // Inline SVG figures.
  for (const match of source.matchAll(/<svg\b[\s\S]*?<\/svg>/gi)) {
    const block = match[0];
    const hasLabel = /<title\b/i.test(block) || /\baria-label\s*=\s*["'][^"']+["']/i.test(block);
    if (!hasLabel) warn(file, 'SVG inline sem <title> ou aria-label.');
    if (/<image\b/i.test(block)) fail(file, 'SVG inline contém <image> raster.');
    if (/\b(href|xlink:href)\s*=\s*["']https?:/i.test(block)) {
      fail(file, 'SVG inline referencia recurso externo.');
    }
    if (/url\(\s*['"]?https?:/i.test(block)) fail(file, 'SVG inline usa url() externa.');

    for (const size of block.matchAll(/font-size\s*=\s*["']?([\d.]+)/gi)) {
      if (Number(size[1]) < 12) {
        warn(file, `SVG com texto abaixo de 12px (font-size ${size[1]}).`);
      }
    }
  }
}

console.log(`\n${existingFiles.length} arquivos verificados | ${errors} erro(s) | ${warnings} aviso(s)`);
if (errors > 0) process.exitCode = 1;
