const getPrime = (num) => {
  const primeArray = []
  for (let i = 2; i <= num; i++) {
    let flag = true
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        flag = false
        break
      }
    }
    if (flag) primeArray.push(i)
  }
  return primeArray
}

const getPrime2 = (num) => {
  const prime = [] // 获取所有的质数
  const isPrime = new Array(num).fill(true) // 首先设置所有的数都是质数

  // 同样的范围重复，则代表不是质数
  for (let i = 2; i <= num; i++) {
    if (!isPrime[i]) continue
    prime.push(i)
    for (let j = i; j < num; j += i) isPrime[j] = false
  }

  return prime
}

const a = getPrime2(100)

console.log(a)
