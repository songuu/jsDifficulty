/* 
* 需要考虑的是小数的情况
*/
function format(number) {
    const num = String(number)
    const reg = /\d{1,3}(?=(\d{3})+$)/g
    const res = num.replace(/^(-?)(\d+)((\.\d+)?)$/, function (match, s1, s2, s3) {
        return s1 + s2.replace(reg, '$&,') + s3
    })
    return res
}

function format1(num) {
    num = num + '';//数字转字符串  
    var str = "";//字符串累加  
    for (var i = num.length - 1, j = 1; i >= 0; i--, j++) {
        if (j % 3 == 0 && i != 0) {//每隔三位加逗号，过滤正好在第一个数字的情况  
            str += num[i] + ",";//加千分位逗号  
            continue;
        }
        str += num[i];//倒着累加数字
    }
    return str.split('').reverse().join("");//字符串=>数组=>反转=>字符串  
}

console.log(format(12313.4141412))