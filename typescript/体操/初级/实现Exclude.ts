/* 
* 1. 分发特性
* 2. 任意类型 | never = 任意类型
*/

type MyExclude<T, U> = T extends U ? never : T;