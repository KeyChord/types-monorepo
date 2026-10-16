import JSONC from 'tiny-jsonc';
import { defineConfig } from 'vite-plus'
import { join } from 'desm'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import { dirname } from 'node:path'

const require = createRequire(import.meta.url)
const nodeTypes = require.resolve('@types/node/package.json')
// Resolve transitive declarations from their owner, including with pnpm's isolated layout.
const vendoredTypes = {
  'bun-types': require.resolve('bun-types/package.json'),
  node: nodeTypes,
  'undici-types': createRequire(nodeTypes).resolve('undici-types/package.json'),
}

export default defineConfig({
  pack: {
    entry: './src/tsconfig.jsonc',
    outExtensions: () => ({ js: '.json' }),
    inputOptions: {
      moduleTypes: {
        '.jsonc': 'empty'
      }
    },
    outDir: 'exports',
    // The entry is JSONC loaded as an empty module, so there are no declarations to emit.
    dts: false,
    plugins: [{
      name: 'transform-tsconfig',
      writeBundle() {
        const vendorDir = join(import.meta.url, 'exports/vendor')
        fs.rmSync(vendorDir, { recursive: true, force: true })
        for (const [name, manifest] of Object.entries(vendoredTypes)) {
          // Keep nested declarations, typesVersions, and upstream license files intact.
          fs.cpSync(dirname(manifest), `${vendorDir}/${name}`, { recursive: true, dereference: true })
        }
        const tsconfig = fs.readFileSync(join(import.meta.url, 'src/tsconfig.jsonc'), 'utf8')
        fs.writeFileSync(join(import.meta.url, 'exports/tsconfig.json'), JSON.stringify(JSONC.parse(tsconfig), null, 2))
      }
    }]
  },
});
