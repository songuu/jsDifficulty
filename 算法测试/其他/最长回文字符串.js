/* 
给你一个字符串 s，找到 s 中最长的回文子串。

输入：s = "babad"
输出："bab"
解释："aba" 同样是符合题意的答案。


输入：s = "cbbd"
输出："bb"

输入：s = "a"
输出："a"

输入：s = "ac"
输出："a"
*/

/*
 * 解法： 由中间向两边扩散
 * 需要区分奇数和偶数的情况
 */

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const len = s.length;

  if (len < 2) return s;

  let res = "";

  for (let i = 0; i < len; i++) {
    console.log("次序", i);
    find(i, i);
    // 回文子串长度是偶数
    find(i, i + 1);
  }

  function find(m, n) {
    console.log("before", m, n);
    while (m >= 0 && n < len && s[m] === s[n]) {
      m--;
      n++;
    }

    console.log("after", m, n);

    if (n - m - 1 > res.length) {
      res = s.slice(m + 1, n);
    }

    console.log("结果", res);
  }
  return res;
};

var longestPalindrome1 = function (s) {
  if (s.length < 2) {
    return s;
  }
  let res = "";
  for (let i = 0; i < s.length; i++) {
    // 回文子串长度是奇数
    helper(i, i);
    // 回文子串长度是偶数
    helper(i, i + 1);
  }

  function helper(m, n) {
    while (m >= 0 && n < s.length && s[m] == s[n]) {
      m--;
      n++;
    }
    // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
    // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1
    if (n - m - 1 > res.length) {
      // slice也要取[m+1,n-1]这个区间
      res = s.slice(m + 1, n);
    }
  }
  return res;
};

// * 动态规划
/*
 * 判断的条件是
 * 间距大于2并且两端相同或者间距小于2[只有0或者1个元素][防止越界]
 * 双重循环
 */
var longestPalindrome2 = function (s) {
  const len = s.length;

  let res = "";

  let dp = Array.from(new Array(len), () => new Array(len).fill(0));

  for (let i = len - 1; i > 0; i--) {
    for (let j = i; j < len; j++) {
      dp[i][j] = s[i] === s[j] && (j - i < 2 || dp[i + 1][j - 1]);

      if (dp[i][j] && j - i + 1 > res.length) {
        res = s.slice(i, j + 1);
      }
    }
  }

  return res;
};

console.log(longestPalindrome2("cbbd"));
