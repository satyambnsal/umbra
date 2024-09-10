import { resolve } from 'node:path';
import { withPageConfig } from '@extension/vite-config';
import svgr from 'vite-plugin-svgr';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

export default withPageConfig({
  plugins: [svgr()],
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  publicDir: resolve(rootDir, 'public'),
  build: {
    outDir: resolve(rootDir, '..', '..', 'dist', 'popup'),
  },
});
