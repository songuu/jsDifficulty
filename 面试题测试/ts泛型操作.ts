/*
 * @Author: songyu
 * @Date: 2021-05-31 17:43:08
 * @LastEditor: songyu
 * @LastEditTime: 2021-05-31 17:44:26
 */
// 实现一个 ts 的工具函数 GetOnlyFnProps<T> ，提取泛型类型 T 中字段类型是函数的工具函数，其中 T 属于一个对象。
type GetOnlyFnKeys<T extends object> = {
  [K in keyof T]: T[K] extends Function ? K : never
}[keyof T]

type GetOnlyFnProps<T extends object> = {
  [K in GetOnlyFnKeys<T>]: T[K]
}

// 实现一个 ts 的工具函数 UnGenericPromise<T> ，提取 Promise 中的泛型类型
type UnGenericPromise<T extends Promise<any>> = T extends Promise<infer U> ? U : never