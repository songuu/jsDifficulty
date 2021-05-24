/*
 * @Author: songyu
 * @Date: 2021-05-24 17:54:15
 * @LastEditor: songyu
 * @LastEditTime: 2021-05-24 18:08:28
 */
function fn(str) {
  if (!str || typeof str !== 'string') {
    return ''
  }
  var arr = []
  var pos = (i = start = end = index = 0)
  while (true) {
    index = arr.indexOf(str[i])
    if (i < str.length && index === -1) {
      arr.push(str[i])
      i++
    } else {
      /*
       * 含有
       * 1. arr第一个元素
       * 2. arr非第一个元素
       * 3. 记录下当前开始和结束的位置
       */
      if (arr.length > end - start) {
        start = pos
        end = i
      }
      arr.length = 0
      if (end - start === str.length || pos + 1 >= str.length - end + start) {
        break
      }
      i = pos = pos + index + 1
    }
  }
  return str.substr(start, end)
}

function maxStr(str) {
  // 非字符窜类型
  if (!str || typeof str !== 'string') {
    return ''
  }
  let arr = []

  let pos = (i = start = end = index = 0)

  while (true) {
    let index = arr.indexOf(str[i])

    // 不含有
    if (i < str.length && index === -1) {
      arr.push(str[i])
      i++
    } else {
      if (arr.length > end - start) {
        pos = start
        end = i
      }

      arr.length = 0

      if (end - start === str.length || pos + 1 >= str.length - end + start) {
        break
      }
      i = pos = pos + index + 1
    }
  }
}

console.log(fn('abcabc'))
