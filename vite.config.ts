import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: './dist/vite/',
  },
  publicDir: './packages/',
  resolve: {
    alias: {
      '@robbert/app': './packages/app/src/index.ts',
      '@robbert/platform': './packages/platform/src/index.ts',
      '@robbert/plugin-a': './packages/plugin-a/src/index.ts',
      '@robbert/plugin-b': './packages/plugin-b/src/index.ts',
    },
  },
});
