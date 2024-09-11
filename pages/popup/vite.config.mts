import { resolve } from 'node:path';
import { withPageConfig } from '@extension/vite-config';
import svgr from 'vite-plugin-svgr';
import viteResolve from 'vite-plugin-resolve';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

const aztecVersion = '0.51.0';

export default withPageConfig({
  plugins: [nodePolyfills(), svgr()],
  resolve: {
    alias: {
      '@src': srcDir,
      '@aztec/bb.js': resolve(__dirname, './public/bb_0.51.0.js'),
    },
  },
  publicDir: resolve(rootDir, 'public'),
  build: {
    outDir: resolve(rootDir, '..', '..', 'dist', 'popup'),
    target: 'esnext',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
    },
  },
});
