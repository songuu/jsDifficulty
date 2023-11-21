/*
 * @Author: songyu
 * @Date: 2021-06-10 20:10:31
 * @LastEditTime: 2021-06-10 21:10:25
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\jsDifficulty\面试题测试\腾讯面试.js
 */
// 1. 给你一个仅含有英文字母和“？”字符的字符串，
// 请将所有的“？”转换为若干小写字母
// 使最终的字符串不包含任何连续重复的字符


// 生成26个字母数组 随机选择
var modifyString = function (s) {
    let codes = Array(26).fill(0).map((t, i) => String.fromCharCode(i + 97))
    let list = s.split('')
    for (let i = 0; i < list.length; i++) {
        if (list[i] === '?') {
            let j = 0
            while (j < 26) {
                if (codes[j] !== list[i - 1] && codes[j] !== list[i + 1]) {
                    list[i] = codes[j]
                    break;
                }
                j++
            }
        }
    }
    return list.join('')
};

var modifyString1 = function (s) {
    const arr = [...s];
    for (let i = 0; i < s.length; i++) {
        if (arr[i] == '?') {
            let temp = 'a', num = 0;
            while (arr[i - 1] == temp || temp == arr[i + 1]) {
                temp = String.fromCharCode(97 + num);
                num++;
            }
            arr[i] = temp;
        }
    }
    return arr.join('');
};

// 2. 字符串轮转
// 检测s1是否是由s2轮转而成

// 时间复杂度大于1
function reserve(s1, s2) {
    if (s1.length !== s2.length) {
        return false;
    }

    if (s1 === "" && s2 === "") {
        return true
    }

    let left = 0;

    let s = "";

    while (left < s1.length) {
        s = s1.slice(left) + s1.substring(0, left)
        if (s === s2) {
            return true;
        } else {
            left++;
        }
    }

    return false;
}

// 时间复杂度等于1
function reserve1(s1, s2) {
    return s1.length === s2.length && (s1 + s1).indexOf(s2) > -1
}

console.log(reserve('', ''))
console.log(reserve('aa', 'aba'))
console.log(reserve('aba', 'bab'))
console.log(reserve('waterbottle', 'erbottlewat'))

console
// waterbottlewaterbottle
// aaaa