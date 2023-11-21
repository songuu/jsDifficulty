/*
 * @Author: songyu
 * @Date: 2021-05-21 15:09:19
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-08 22:01:05
 */
const arr = [1, 2, 3]
// * then 里面返回的是一个函数
/* arr.reduce(
  (p, x) =>
    p.then(() => new Promise((r) => setTimeout(() => r(console.log(x)), 1000))),
  Promise.resolve()
) */

// * then 里面返回的是一个new Promise(一个值) 所有都直接透传
const result = arr.reduce(
  (p, x) =>
    p.then(new Promise((r) => setTimeout(() => r(console.log(x)), 1000))),
  Promise.resolve()
)
