/*
 * @Author: your name
 * @Date: 2021-05-13 22:00:25
 * @LastEditTime: 2021-05-23 17:15:00
 * @LastEditors: songyu
 * @Description: In User Settings Edit
 * @FilePath: \项目文件\jsDifficulty\面试题测试\字符串出现的不重复最长长度.js
 */
/**
 * 题目：字符串出现的不重复最长长度
 * 整体思路：
 * 用一个滑动窗口装没有重复的字符，枚举字符记录最大值即可
 * 对于遇到重复字符如何收缩窗口大小？
 * 我们可以用 map 维护字符的索引，遇到相同的字符，把左边界移动过去即可
 * 挪动的过程中记录最大长度
 */
var lengthOfLongestSubstring = function (s) {
    let map = new Map();
    let i = -1
    let res = 0
    let n = s.length
    for (let j = 0; j < n; j++) {
        if (map.has(s[j])) {
            i = Math.max(i, map.get(s[j]))
        }
        res = Math.max(res, j - i)
        map.set(s[j], j)
    }
    return res
};

// * 直接使用对象
var lengthOfLongestSubstring1 = function (s) {
    let map = {};
    let i = -1
    let res = 0
    let n = s.length
    for (let j = 0; j < n; j++) {
        if (map[s[j]]) {
            i = Math.max(i, map[s[j]])
        }
        res = Math.max(res, j - i)
        map[s[j]] = j;
    }
    return res
};


console.log(lengthOfLongestSubstring1("12121221213"))