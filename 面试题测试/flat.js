/*
 * @Author: your name
 * @Date: 2021-05-15 17:07:29
 * @LastEditTime: 2021-05-15 17:29:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目文件\jsDifficulty\面试题测试\flat.js
 */

function flat(arr) {
    if (!arr.length) return arr;

    let arrBox = [];
    function makeFlat(arr1) {
        for (let i of arr1) {
            if (Array.isArray(i)) {
                makeFlat(i)
            } else {
                arrBox.push(i)

            }
        }
    }
    makeFlat(arr);

    return arrBox;
}

function flatten(arr) {
    var res = [];
    for (let i = 0, length = arr.length; i < length; i++) {
        if (Array.isArray(arr[i])) {
            res = res.concat(flatten(arr[i]));
        } else {
            res.push(arr[i]);
        }
    }
    return res;
}

function flatten1(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

let a = flat([1, [2, 3], [4, [5, [6]]]])

console.log(a)