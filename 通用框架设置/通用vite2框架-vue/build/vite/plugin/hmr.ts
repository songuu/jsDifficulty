/*
 * @Author: songyu
 * @Date: 2021-06-17 15:07:01
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-17 15:19:50
 */
import type { Plugin } from 'vite';

export function configHmrPlugin(): Plugin {
  return {
    name: 'singleHMR',
    handleHotUpdate({ modules, file }) {
      if (file.match(/xml$/)) return [];

      modules.forEach((m) => {
        if (!m.url.match(/\.(css|less)/)) {
          m.importedModules = new Set();
          m.importers = new Set();
        }
      });
      return modules;
    },
  };
}
