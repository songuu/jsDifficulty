const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export const isUrl = (path: string): boolean => reg.test(path)
/** 判断是否是图片链接 */
export const isImg = (path: string) => {
  return /\w.(png|jpg|jpeg|svg|webp|gif|bmp)$/i.test(path)
}

const objPtoToString = Object.prototype.toString

export function isPromise(val: any): val is Promise<any> {
  return objPtoToString.call(val) === '[object Promise]'
}

export function isDate(val: any): val is Date {
  return objPtoToString.call(val) === '[object Date]'
}
// eslint-disable-next-line
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}
// eslint-disable-next-line
export function isPlainObject(val: any): val is Object {
  return objPtoToString.call(val) === '[object Object]'
}

export function isElement(val: any): val is Element {
  return val instanceof Element
}

/**
 * 深拷贝工具函数
 * @param objs
 * @returns
 */
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          // 第二次遍历时发现仍让是一个普通的object，而且存在result中那么就是合并这俩个对象
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            // 第一次就是深拷贝这个对象，并赋值
            result[key] = deepMerge({}, val)
          }
        } else {
          // 第一就是普通赋值，第二次这个属性如果不存在就赋值存在覆盖
          result[key] = val
        }
      })
    }
  })

  return result
}

/**
 * @description 将时间戳转换为年-月-日-时-分-秒格式
 * @param {String} timestamp
 * @returns {String} 年-月-日-时-分-秒
 */

export function timestampToTime(timestamp: string) {
  const date = new Date(timestamp)
  const Y = date.getFullYear() + '-'
  const M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  const h =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  const m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

  const strDate = Y + M + D + h + m + s
  return strDate
}

/**
 * 删除对象的一些字段
 * @param obj
 * @param keys
 * @returns
 */
// eslint-disable-next-line
export function filterObjFields(obj: object, keys: string[]) {
  return Object.keys(obj).reduce((o, key) => {
    if (!keys.includes(key)) {
      o[key] = (obj as any)[key]
    }
    return o
  }, {} as { [key: string]: any })
}

/**
 * 删除请求中间的空值
 * @param obj
 * @returns
 */
export function filterParam(obj: any) {
  var _newPar: any = {};
  for (var key in obj) {
    //如果对象属性的值不为空，就保存该属性（这里我做了限制，如果属性的值为0，保存该属性。如果属性的值全部是空格，属于为空。
    if ((obj[key] === 0 || obj[key] === false || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
      _newPar[key] = obj[key];
    }
  }
  return _newPar;
}