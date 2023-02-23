/*
给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。

具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
*/

/*
示例 1：

输入："abc"
输出：3
解释：三个回文子串: "a", "b", "c"
示例 2：

输入："aaa"
输出：6
解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
*/

/**
 * @param {string} s
 * @return {number}
 */
const countSubstrings = (s) => {
  const len = s.length
  let count = 0
  const dp = new Array(len)

  /* for (let j = 0; j < len; j++) {
        for (let i = 0; i <= j; i++) {
            // 相等 && 挨着 或者 当前的后一个为回文
            if (s[i] == s[j] && (j - i <= 1 || dp[i + 1])) {
                dp[i] = true;
                count++;
            } else {
                dp[i] = false;
            }
        }
    } */

  for (let j = 0; j < len; j++) {
    for (let i = 0; i <= j; i++) {
      if (j == i) {
        dp[i] = true
        count++
      } else if (j - i == 1 && s[i] == s[j]) {
        dp[i] = true
        count++
      } else if (j - i > 1 && s[i] == s[j] && dp[i + 1]) {
        dp[i] = true
        count++
      } else {
        dp[i] = false
      }
    }
  }

  return count
}

/* 
单个字符
两个字符
多于两个字符
*/
const countSubstrings1 = (s) => {
  let count = 0
  const len = s.length

  const dp = new Array(len)
  for (let i = 0; i < len; i++) {
    dp[i] = new Array(len).fill(false) // 二维矩阵
  }
  console.log('dp', dp)

  // 使用的是矩阵的右上角

  for (let j = 0; j < len; j++) {
    for (let i = 0; i <= j; i++) {
      if (i == j) {
        // 单个字符的情况
        dp[i][j] = true
        count++
      } else if (j - i == 1 && s[i] == s[j]) {
        // 两个字符的情况
        dp[i][j] = true
        count++
      } else if (j - i > 1 && s[i] == s[j] && dp[i + 1][j - 1]) {
        console.log('i', i, 'j', j)
        // 多于两个字符
        dp[i][j] = true
        count++
      }
    }
  }

  console.log('dp', dp)
  return count
}

let a = countSubstrings1('aaa')

console.log(a)
