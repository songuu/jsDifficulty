/* 
  思路1：二维数组记录 dp[i] => arr[i][i] 
         个数为
          1 =》 1
          2 =》 相同 3 不相同 2
          相邻相等

          j 横坐标
          i 纵坐标
*/

function makeSameNum(str) {
  let len = str.length

  let dp = new Array(len)

  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len).fill(false)
  }

  let count = 0
  for (let j = 0; j < len; j++)
    for (let i = 0; i <= j; i++)
      if (str.charAt(j) == str.charAt(i))
        if ((dp[i][j] = i == j || j - i == 1 || dp[i + 1][j - 1])) count++
  return count
}

var minCut = function (s) {
  let dp = new Array(s.length).fill(s.length)

  for (let i = 0; i < s.length; i++) {
    let j = 0
    while (true) {
      if (i - j < 0 || i + j > s.length - 1) {
        break
      }
      if (s[i - j] === s[i + j]) {
        if (i - j === 0) dp[i + j] = 0
        else dp[i + j] = Math.min(dp[i + j], dp[i - j - 1] + 1)
      } else {
        break
      }
      j++
    }

    j = 1
    while (true) {
      if (i - j + 1 < 0 || i + j > s.length - 1) {
        break
      }
      if (s[i - j + 1] === s[i + j]) {
        if (i - j + 1 === 0) dp[i + j] = 0
        else dp[i + j] = Math.min(dp[i + j], dp[i - j] + 1)
      } else {
        break
      }
      j++
    }
  }

  return dp[s.length - 1]
}

let a = makeSameNum('aaabbb')

console.log(a)
