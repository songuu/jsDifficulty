/*
 * @Author: songyu
 * @Date: 2021-03-10 20:22:38
 * @LastEditTime: 2021-05-30 21:15:41
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\通用vite2框架-vue\src\utils\http\axios\helper.ts
 */
import { isObject, isString } from '/@/utils/is';

export function createNow<T extends boolean>(
  join: boolean,
  restful: T
): T extends true ? string : object;

export function createNow(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm';
/**
 * @description: 格式话请求里面的时间
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return;
  }

  for (const key in params) {
    if (params[key] && params[key]._isAMomentObject) {
      params[key] = params[key].format(DATE_TIME_FORMAT);
    }
    if (isString(key)) {
      const value = params[key];
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value;
        } catch (error) {
          throw new Error(error);
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key]);
    }
  }
}
