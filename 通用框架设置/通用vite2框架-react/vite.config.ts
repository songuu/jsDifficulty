import type { UserConfig, ConfigEnv } from 'vite';

import { loadEnv } from 'vite';

import { createProxy } from './build/vite/proxy';
import { createAlias } from './build/vite/alias';
import { wrapperEnv } from './build/utils';
import { OUTPUT_DIR } from './build/constant';

import reactRefresh from '@vitejs/plugin-react-refresh'

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE, VITE_LEGACY } = viteEnv;

  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: createAlias([
        // /@/xxxx => src/xxxx
        ['/@/', 'src'],
        // /#/xxxx => types/xxxx
        ['/#/', 'types'],
      ]),
    },
    server: {
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
      hmr: {
        overlay: true,
      },
    },
    build: {
      outDir: OUTPUT_DIR,
      polyfillDynamicImport: VITE_LEGACY,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 1200,
    },
    plugins: [reactRefresh()]
  }
}