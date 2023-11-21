/* 
* 1：指定类型的readonly
* 2: 存在对象 剔除
*
*/

type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [P in K]: T[P];
} & {
    [P in keyof T as P extends K ? never : P]: T[P];
  };