import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const require = createRequire(import.meta.url);
const packageDir = fileURLToPath(new URL('..', import.meta.url));
// TypeScript 7's `exports` no longer exposes `bin/tsc`, so resolve it beside the manifest.
const tsc = join(dirname(require.resolve('typescript/package.json')), 'bin/tsc');

test('packed config provides Bun and transitive types to an isolated consumer', () => {
  const temp = mkdtempSync(join(tmpdir(), 'keychord-tsconfig-'));
  try {
    const [packed] = JSON.parse(execFileSync('npm', [
      'pack', '--json', '--ignore-scripts', '--pack-destination', temp,
    ], { cwd: packageDir, encoding: 'utf8' }));
    const consumer = join(temp, 'consumer');
    const installed = join(consumer, 'node_modules/@keychord/tsconfig');
    mkdirSync(installed, { recursive: true });
    execFileSync('tar', ['-xzf', join(temp, packed.filename), '-C', installed, '--strip-components=1']);
    const manifest = JSON.parse(readFileSync(join(installed, 'package.json'), 'utf8'));
    assert.equal(manifest.dependencies, undefined);
    assert.equal(manifest.peerDependencies, undefined);
    assert.equal(JSON.parse(readFileSync(join(installed, 'exports/vendor/bun-types/package.json'), 'utf8')).version,
      require('bun-types/package.json').version);
    writeFileSync(join(consumer, 'tsconfig.json'), JSON.stringify({
      extends: '@keychord/tsconfig',
      include: ['index.ts'],
    }));
    writeFileSync(join(consumer, 'index.ts'), `
import { file } from 'bun';
import { Database } from 'bun:sqlite';
import { expect } from 'bun:test';
import { readFile } from 'node:fs/promises';
const contents: string = await file('example.txt').text();
const bytes: Buffer = await readFile('example.txt');
const response: Response = await fetch('https://example.com');
const db = new Database(':memory:');
const runtimeVersion: string = Bun.version;
const cwd: string = process.cwd();
expect(contents).toBeString();
// @ts-expect-error Bun declarations must be checked, not silently resolved as any.
const wrong: number = Bun.version;
`);
    const check = () => execFileSync(process.execPath, [tsc, '--project', consumer], {
      cwd: consumer, encoding: 'utf8', stdio: 'pipe',
    });
    try {
      check();
      // Additional consumer types still resolve when selected alongside Bun.
      const custom = join(consumer, 'node_modules/@types/custom/index.d.ts');
      mkdirSync(dirname(custom), { recursive: true });
      writeFileSync(custom, 'declare const customValue: string;');
      writeFileSync(join(consumer, 'tsconfig.json'), JSON.stringify({
        extends: '@keychord/tsconfig',
        compilerOptions: { types: ['bun-types', 'custom'] },
        include: ['index.ts'],
      }));
      writeFileSync(join(consumer, 'index.ts'), '\nconst extra: string = customValue;\n', { flag: 'a' });
      check();
    } catch (error) {
      throw new Error(error.stdout || error.message, { cause: error });
    }
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});
