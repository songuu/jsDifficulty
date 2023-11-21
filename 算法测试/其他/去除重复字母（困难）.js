// 题目
/*
给你一个仅包含小写字母的字符串，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证返回结果的字典序最小（要求不能打乱其他字符的相对位置）。

示例 1:

输入: "bcabc"
输出: "abc"
示例 2:

输入: "cbacdcbc"
输出: "acdb"
*/
/* 
    思路：
    1.判断是否在stack栈里面
        1.1在直接跳出循环
        1.2不在 栈存在 && 栈顶元素 > 当前元素 && 在当前字符串中还有这个元素
            推出栈顶元素
        往栈中推入当前元素
*/

const repeatNum = (str) => {
  if (str.length === 0) {
    return str
  }

  let obj = {}

  for (let i of str) {
    let keys = Object.keys(obj)
    if (keys.indexOf(i) > -1) {
      obj[i]++
      continue
    } else {
      obj[i] = 1
    }
  }

  return Object.keys(obj).join('')
}

var repeatNum1 = (s) => {
  var stack = []
  for (var i = 0; i < s.length; i++) {
    var char = s[i]
    if (stack.indexOf(char) > -1) continue
    while (
      stack.length > 0 &&
      stack[stack.length - 1] > char &&
      s.indexOf(stack[stack.length - 1], i) > i
    ) {
      stack.pop()
    }
    stack.push(char)
  }
  return stack.join('')
}

console.log(repeatNum1('cbacdcbc'))
