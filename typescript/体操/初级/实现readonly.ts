/* 
* 手动实现readonly
* 思路：
* 利用提供的readonly
*/
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}

