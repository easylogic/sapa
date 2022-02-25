import { defineConfig } from 'vite'
import path from 'path';
import dts from 'vite-plugin-dts'
const localDir = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(localDir, 'src'),
      name: 'sapa',
      fileName: (format) => `sapa.${format}.js`
    }
  },
  plugins: [dts({
    insertTypesEntry: true,
    outputDir: path.resolve(localDir, '@types'),
  })]
})