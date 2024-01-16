import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite'
import eslint from 'vite-plugin-eslint';
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: 'es2022',
  },
  css: {
    preprocessorOptions: {
      scss: {
      },
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2,
          },
        },
      },
    }),
    ElementPlus(),
    eslint(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.js'],
    testTimeout: 2000,
    onConsoleLog(log) {
      return !log.includes('Download the Vue Devtools extension')
        && !log.includes('You are running Vue in development mode.');
    },
  },
})
