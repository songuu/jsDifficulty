/*
 * @Author: songyu
 * @Date: 2021-05-27 20:30:29
 * @LastEditTime: 2021-05-28 09:11:54
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\jsDifficulty\面试题测试\回文字符串.js
 */
// 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
    let str = s.toLocaleLowerCase().match(/[a-z0-9]+/g);

    if(!str) return true;

    let ss = str.join("");

    let left = 0, right = ss.length - 1;

    while(left < right) {
        if(ss[left] === ss[right]) {
            left++;
            right--;
        } else {
            return false;
        }
    }

    return true;
};

let a = isPalindrome("ab_a")

console.log(a)