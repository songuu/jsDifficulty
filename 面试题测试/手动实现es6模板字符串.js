/*
 * 原理：使用的是正则表达式的替换功能
 */

let year = 3,
  pos = '前端'
let str = '我已经有${year}年${pos}开发经验了'
function replace(str) {
  // 原理是通过正则匹配，替换原字符串中的变量
  console.log(str)
  return str.replace(/\$\{([^}])\}/g, function (matched, key) {
    console.log(key)
    console.log(arguments) // arguments见下面
    return eval(key)
  })
}

console.log(replace(str))
