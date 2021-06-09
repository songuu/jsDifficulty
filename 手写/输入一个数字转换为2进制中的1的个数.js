/*
* 输入一个整数， 将其转换为2进制以后中间含有的1的个数
*/

// 方法1 计算 num与num - 1 相与

function NumberOf11(num) {
    let flag = 0;
    while (num != 0) {
        num = num & (num - 1); //
        flag += 1;
    }

    return flag;
}

// 直接转换为2进制字符串 (但是考虑负数, 负数为补位) 
function NumberOf12(num) {
    if (num < 0) {
        num = num >>> 0;
    }

    let flag = 0;

    num = num.toString(2);
    for (let i = 0; i < num.length; i++) {
        if (num[i] == 1) {
            flag += 1;
        }
    }

    return flag;
}

// let a = NumberOf12(10)

// console.log(a)