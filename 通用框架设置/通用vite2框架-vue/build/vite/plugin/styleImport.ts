/*
 * @Author: songyu
 * @Date: 2021-04-26 09:53:38
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-17 15:20:43
 */
import styleImport from 'vite-plugin-style-import';

export function configStyleImportPlugin(isBuild: boolean) {
  if(!isBuild) {
    return [];
  }
  const styleImportPlugin = styleImport({
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`;
        },
      },
    ],
  });
  return styleImportPlugin;
}
