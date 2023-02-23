// 实现一个randomString函数，返回一个数组，该数组内有一千个字符串，每串字符串为6位数0-9的随机验证码，不可重复。
function randomString() {
  const resArr = []
  const tempResMap = {}
  for (let i = 0; i < 1000; i++) {
    judgeCode(resArr, tempResMap)
  }

  return resArr
}

function judgeCode(resArr, tempResMap) {
  let code = renderCode()
  if (tempResMap[code]) {
    judgeCode(resArr, tempResMap)
  }
  tempResMap[code] = true
  resArr.push(code)
  return resArr
}

function renderCode() {
  let temp = []
  for (let i = 0; i < 6; i++) {
    let single = parseInt(Math.random() * 10)
    temp.push(single)
  }
  return temp.join('')
}

console.log(randomString())
