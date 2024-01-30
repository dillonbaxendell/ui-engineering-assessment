import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite'
import eslint from 'vite-plugin-eslint';
import vue from '@vitejs/plugin-vue'
// eslint-disable-next-line import/extensions, import/no-unresolved
import ElementPlus from 'unplugin-element-plus/vite';

const env = loadEnv('development', process.cwd(), '');

export default defineConfig({
  build: {
    target: 'es2022',
  },
  css: {
    preprocessorOptions: {
      scss: true,
    },
  },
  define: {
    'process.env': {
      ...env,
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
  server: {
    proxy: {
      '^/v1': env.VITE_API_URL,
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
    server: {
      deps: {
        inline: ['element-plus'],
      },
    },
  },
})
