import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

// Auditoria consolidada: validate (por arquivo) + assets + visual.
// Uso:
//   npm run audit -- --input slides/decks/<deck>.md
//   npm run audit -- slides/decks/a.md slides/decks/b.md
// Sem argumentos, vale o comportamento padrão de cada script
// (validate no template; assets e visual em todos os decks).

const root = process.cwd();
const args = process.argv.slice(2).filter((arg) => arg !== '--input');
const files = args.filter((arg) => !arg.startsWith('--'));
const hasFiles = files.length > 0;

const run = (script, extra) => {
  const result = spawnSync(process.execPath, [path.join('scripts', script), ...extra], {
    cwd: root,
    stdio: 'inherit',
  });
  return result.status ?? 1;
};

let failed = false;

if (!hasFiles) {
  failed = run('validate-slides.mjs', []) !== 0 || failed;
} else {
  for (const file of files) {
    failed = run('validate-slides.mjs', ['--input', file]) !== 0 || failed;
  }
}

failed = run('audit-assets.mjs', hasFiles ? files : []) !== 0 || failed;
failed = run('audit-visual.mjs', hasFiles ? files : []) !== 0 || failed;

if (failed) {
  console.error('\nAuditoria consolidada: há falhas nos comandos acima.');
  process.exitCode = 1;
} else {
  console.log('\nAuditoria consolidada: validate, assets e visual passaram.');
}
