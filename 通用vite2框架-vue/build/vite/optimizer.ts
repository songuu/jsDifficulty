/*
 * @Author: songyu
 * @Date: 2021-04-26 09:53:38
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-17 15:21:35
 */
import type { GetManualChunk, GetManualChunkApi } from 'rollup';

const vendorLibs: { match: string[]; output: string }[] = [
];

// @ts-ignore
export const configManualChunk: GetManualChunk = (id: string, api: GetManualChunkApi) => {
  console.log(api);
  if (/[\\/]node_modules[\\/]/.test(id)) {
    const matchItem = vendorLibs.find((item) => {
      const reg = new RegExp(`[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`, 'ig');
      return reg.test(id);
    });
    return matchItem ? matchItem.output : null;
  }
};
