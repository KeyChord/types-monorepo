import { defineConfig } from "vite-plus";

export default defineConfig({
  pack: {
    entry: './src/default.js',
    outDir: "exports",
    fixedExtension: false,
    copy: [
      {
        from: 'node_modules/llrt-types/*.d.ts',
        to: 'exports',
      },
      {
        from: 'src/*.d.ts',
        to: 'exports'
      }
    ]
  },
})