import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';

import lessToJS from 'less-vars-to-js'
import fs from 'fs'
import path from 'path'

import styleImport from 'vite-plugin-style-import'

import { createProxy } from './build/vite/proxy';
import { createAlias } from './build/vite/alias';
import { wrapperEnv } from './build/utils';
import { OUTPUT_DIR } from './build/constant';

import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import styleImport from 'vite-plugin-style-import'
import config, { EnvName } from './config'
import lessToJS from 'less-vars-to-js'
import fs from 'fs'
import html from 'vite-plugin-html'

/** 自定义antd主题 */
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './build/antd-variables.less'),
    'utf8',
  ),
)

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

/** 当前环境基础配置 */
const base = config[env]

/** 自定义antd主题 */
const themeVariables = lessToJS(
  fs.readFileSync(
    path.resolve(__dirname, './config/antd-variables.less'),
    'utf8',
  ),
)

// https://vitejs.dev/config/
export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    base: base ? base.cdn : './',
    resolve: {
      alias: createAlias([
        ['@', 'src'],
        ['root', './'],
        ['views', './src/views'],
        ['store', './src/store'],
        ['utils', './src/utils'],
        ['hooks', './src/hooks'],
        ['assets', './src/assets'],
        ['styles', './src/styles'],
        ['apis', './src/apis'],
        ['comps', './src/components']
      ]),
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: themeVariables,
          javascriptEnabled: true,
        },
      },
    },
    server: {
      port: VITE_PORT,
      proxy: createProxy(VITE_PROXY),
      hmr: {
        overlay: true,
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: themeVariables,
          javascriptEnabled: true,
        },
      },
    },
    plugins: [reactRefresh(), styleImport({
      libs: [
        {
          libraryName: 'antd',
          esModule: true,
          resolveStyle: name => {
            return `antd/es/${name}/style/index`
          },
        },
      ],
    }),]
  }
}
