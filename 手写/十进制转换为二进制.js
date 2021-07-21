/*
 * @Author: songyu
 * @Date: 2021-07-05 17:14:14
 * @LastEditTime: 2021-07-06 11:51:12
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\手写\十进制转换为二进制.js
 */
// 使用递归的思路
function convertToBinary (number, bin) {
    if (number > 0) {
        return convertToBinary( parseInt(number / 2) ) + (number % 2)
    };
    return '';
}


let number = 10;
number.toString(2)