/*
 * @Author: songyu
 * @Date: 2021-06-01 09:11:46
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-01 09:12:14
 */
// * 1 使用递归
const cloneDeep1 = (target, hash = new WeakMap()) => {
  // 对于传入参数处理
  if (typeof target !== 'object' || target === null) {
    return target
  }
  // 哈希表中存在直接返回
  if (hash.has(target)) return hash.get(target)

  const cloneTarget = Array.isArray(target) ? [] : {}
  hash.set(target, cloneTarget)

  // 针对Symbol属性
  const symKeys = Object.getOwnPropertySymbols(target)
  if (symKeys.length) {
    symKeys.forEach((symKey) => {
      if (typeof target[symKey] === 'object' && target[symKey] !== null) {
        cloneTarget[symKey] = cloneDeep1(target[symKey])
      } else {
        cloneTarget[symKey] = target[symKey]
      }
    })
  }

  for (const i in target) {
    if (Object.prototype.hasOwnProperty.call(target, i)) {
      cloneTarget[i] =
        typeof target[i] === 'object' && target[i] !== null
          ? cloneDeep1(target[i], hash)
          : target[i]
    }
  }
  return cloneTarget
}
