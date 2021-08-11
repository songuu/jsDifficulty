/*
 * @Author: songyu
 * @Date: 2021-08-11 20:22:28
 * @LastEditTime: 2021-08-11 20:46:05
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \美洽\test\vite.config.ts
 */
import type { UserConfig, ConfigEnv } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

import { loadEnv } from "vite";
import { resolve } from "path";

import { wrapperEnv } from "./build/utils";

import { OUTPUT_DIR } from "./build/constant";

function pathResolve(dir: string) {
  return resolve(process.cwd(), ".", dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH } = viteEnv;

  const isBuild = command === "build";

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        {
          find: /\/actions\//,
          replacement: pathResolve("src") + "/actions",
        },
        {
          find: /\/utils\//,
          replacement: pathResolve("src") + "/utils",
        },
        {
          find: /\/components\//,
          replacement: pathResolve("src") + "/components",
        },
        {
          find: /\/store\//,
          replacement: pathResolve("src") + "/store",
        },
        {
          find: /\/constants\//,
          replacement: pathResolve("src") + "/constants",
        },
        {
          find: /\/pages\//,
          replacement: pathResolve("src") + "/pages",
        },
        {
          find: /\/api\//,
          replacement: pathResolve("src") + "/api",
        },
      ],
    },
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
        },
      },
      modules: {
        localsConvention: "camelCase",
      },
    },
    server: {
      host: true,
      port: VITE_PORT,
    },
    build: {
      target: "es2015",
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    define: {
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
    plugins: [reactRefresh()],
  };
};
