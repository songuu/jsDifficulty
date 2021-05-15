/*
 * @Author: your name
 * @Date: 2021-05-15 17:30:03
 * @LastEditTime: 2021-05-15 17:42:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \项目文件\jsDifficulty\面试题测试\在数组中找出和值为给定值的两个数.js
 */

function find(arr, n) {
    if (!arr.length) return [];

    let result = [];

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[i] + arr[j] === n) {
                result.push([arr[i], arr[j]])
            }
        }
    }

    return result;
}

function find1(arr, n) {
    if (!arr.length) return [];

    let result = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > n) {

        } else {
            let index = arr.findIndex(num => num === n - arr[i]);
            if (index > -1 && i <= index) {
                result.push([arr[i], arr[index]])
            }
        }
    }

    return result;
}


let a = find1(
    [32, 3, 5, 1, 30, 76, 2, 10, 29], 31
)

console.log(a)
