import JSONC from 'tiny-jsonc';
import { defineConfig } from 'vite-plus'
import { join } from 'desm'
import fs from 'node:fs'

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
    dts: true,
    copy: [
      {
        from: './node_modules/@keychord/types/exports/*.d.ts',
        to: 'exports/types',
      }
    ],
    plugins: [{
      name: 'transform-tsconfig',
      writeBundle() {
        const tsconfig = fs.readFileSync(join(import.meta.url, 'src/tsconfig.jsonc'), 'utf8')
        fs.writeFileSync(join(import.meta.url, 'exports/tsconfig.json'), JSON.stringify(JSONC.parse(tsconfig), null, 2))
      }
    }]
  },
});
