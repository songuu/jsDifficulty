/* 
* 关键点：
* 传入的值需要继承前面的值
*
*/
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}

type Case2 = MyPick<{ a: string; b: string; c: string }, 'a' | 'b'>;