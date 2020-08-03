/* 
  编写一个函数来查找字符串数组中的最长公共前缀。

  如果不存在公共前缀，返回空字符串 ""。

  示例 1:

  输入: ["flower","flow","flight"]
  输出: "fl"
  示例 2:

  输入: ["dog","racecar","car"]
  输出: ""
  解释: 输入不存在公共前缀。
*/

/**
 * @param {string[]} strs
 * @return {string}
 * 以第一个字符窜为标准
 * 双重遍历 i：每个字符串 j：每个字母
 */
var longestCommonPrefix = function (strs) {
  if(strs.length === 0) return "";
  let str = strs[0];
  let ans = "";

  for(let i = 0;i < str.length;i++) {
    if(strs.every(item => item[i] === str[i])) {
      ans += str[i]
    } else {
      return ans
    }
  }

  return ans;
}

console.log(longestCommonPrefix(["flower","flow","flight"]))