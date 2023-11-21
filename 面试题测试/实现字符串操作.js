function decodeString(s) {
  const stack = []
  let numStr = ''
  let i = 0

  while (i < s.length) {
    //  判断是否是数字
    if (!isNaN(+s[i])) {
      numStr += s[i]
    } else {
      //  考虑多位数字的情况
      if (numStr) {
        stack.push(numStr)
        numStr = ''
      }

      console.log(stack)

      //  当遇到右括号的时候执行出栈的逻辑
      if (s[i] === ']') {
        const temp = []
        //  这里简单处理不考虑异常输入的情况
        while (true) {
          const current = stack.pop()
          //  如果出栈的时候遇到左括号就用前一个值计算当前字符串
          //  并且把当前字符串作为一个新的值入栈（即把多层嵌套解析后的值作为一个新的字符串整体考虑）
          //  这里字符串链接的时候需要注意逆序一下，不然顺序会反
          if (current === '[') {
            const num = +stack.pop()
            const tempResult = Array(num).fill(temp.reverse().join('')).join('')
            stack.push(tempResult)
            break
          } else {
            temp.push(current)
          }
        }
        //  其他情况直接入栈即可
      } else {
        stack.push(s[i])
      }
    }
    i++
  }

  return stack.join('')
}

const s = '3[a2[c3[d]]]'

// decodeString(s)
console.log(decodeString(s))
