import { defineConfig } from 'vite';
import eslintPlugin from 'vite-plugin-eslint';
import reactRefresh from '@vitejs/plugin-react-refresh';
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  root: './src/render',
  base: './',
  plugins: [reactRefresh(), eslintPlugin({
    include: ['./src/**/*.ts', './src/**/*.tsx'],
    fix: true
  })],
  build: {
    outDir: path.join(__dirname, 'dist/render'),
    assetsDir: '',
    rollupOptions: {
      output: {
        format: 'cjs',
      },
      external: ['electron'],
    },
  },
  optimizeDeps: {
    exclude: ['electron'],
  }
});
