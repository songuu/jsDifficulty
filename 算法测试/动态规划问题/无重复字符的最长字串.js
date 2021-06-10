/*
 * @Author: songyu
 * @Date: 2020-09-20 15:50:25
 * @LastEditTime: 2021-06-10 19:11:36
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\算法测试\动态规划问题\无重复字符的最长字串.js
 */
/* 
  题目要求:
    给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
    输入: "abcabcbb"
    输出: 3 
    解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
*/

/* 
  解体思路
  这是一道动态规划题目
  1.声明两个变量， currentString： 当前无重复字符的子串，max，无重复字符的最大子串长度
  2.判断当前的最长串中是否有该字母s[i],

  如果没有,则加上s[i],
  如果有，则需要从重复的位置断开，开始新的计算
  计算该次循环出现的无重复字符的最大子串长度
*/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let currentString = ''
  let max = 0
  for (let i = 0; i < s.length; i++) {
    const index = currentString.indexOf(s[i])
    // 判断当前的最长串中是否有该字母
    if (index < 0) {
      // 如果没有,则加上s[i]
      currentString += s[i]
    } else {
      // 如果有，则需要从重复的位置断开，开始新的计算
      currentString = currentString.substring(index + 1) + s[i]
    }
    max = Math.max(max, currentString.length)
  }
  return max
}

var lengthOfLongestSubstring = function (s) {
  if (s.length <= 1) {
    return s.length;
  }

  let arr = [], max = 0
  for (let i = 0; i < s.length; i++) {
    let index = arr.indexOf(s[i])
    if (index > -1) {
      arr.splice(0, index + 1);
    }
    arr.push(s.charAt(i))
    max = Math.max(arr.length, max)
  }
  return max
};

var lengthOfLongestSubstring = function (s) {
  if (!s) {
    return 0;
  }

  // 窗口，key是字符，value是字符出现的次数
  let win = new Map();

  let result = 0;
  let left = 0
  let right = 0;

  while (right < s.length) {
    // 右边字符数加1，右窗口扩大
    let rightLetter = s[right];
    win.set(rightLetter, (win.get(rightLetter) || 0) + 1);
    right++;

    // 如果右边字符数大于1，说明此时出现了重复字符，应该缩小左窗口
    // 一直缩到没有出现重复字符了，此时更新最长无重复字串的长度
    while (win.get(rightLetter) > 1) {
      let leftLetter = s[left];
      if (win.has(leftLetter)) {
        win.set(leftLetter, win.get(leftLetter) - 1);
      }
      left++;
    }
    result = Math.max(result, (right - left));
  }
  return result;
};