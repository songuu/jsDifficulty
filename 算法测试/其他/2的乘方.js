/*
 * @Author: songyu
 * @Date: 2021-05-31 16:37:39
 * @LastEditor: songyu
 * @LastEditTime: 2021-05-31 16:37:59
 */
/*
我的实现 
首先判断数值的大小
*/
function check(num) {
  if (num < 0 || num === 0) {
    return false
  }

  if (num === 1) {
    return true
  }

  while ((num = num / 2)) {
    if (num % 2 === 0) {
      return true
    } else {
      continue
    }
  }

  return false
}

/* 
网上的简单的实现的方法
*/

function check1(num) {
  if (num === 0 || num < 0) {
    return false
  }

  if (num & (num - 1)) {
    return false
  } else {
    return true
  }
}

console.log(check1(8))
