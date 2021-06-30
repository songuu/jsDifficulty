/*
 * @Author: songyu
 * @Date: 2021-03-10 20:22:38
 * @LastEditTime: 2021-06-30 17:50:07
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\通用vite2框架-vue\src\store\index.ts
 */
import type { App } from 'vue';
import { createPinia } from 'pinia';

const store = createPinia();

export function setupStore(app: App<Element>) {
  app.use(store);
}

export { store };
