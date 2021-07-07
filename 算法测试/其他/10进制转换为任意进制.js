/*
 * @Author: songyu
 * @Date: 2021-07-06 20:26:02
 * @LastEditTime: 2021-07-06 20:27:30
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\jsDifficulty\面试题测试\10进制转换为任意进制.js
 */
function tenToOther(num, base) {
  const baseNumber = "0123456789abcdefghijklmnopqrstuvwxyz";
  const result = [];
  while (num) {
    const rest = num % base;
    num = Math.floor(num / base);
    result.unshift(baseNumber[rest]);
  }
  return result.join("");
}


let res = tenToOther(100, 16)

console.log(res)