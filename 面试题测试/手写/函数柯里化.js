/*
 * @Author: songyu
 * @Date: 2021-05-31 21:09:48
 * @LastEditTime: 2021-06-06 21:18:20
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\面试题测试\手写\函数柯里化.js
 */
const curry = () => {
    let args = [...arguments];

    function fn() {
        args.push(...arguments);

        return fn;
    }

    fn.toString = function () {
        // return args.reduce((sum, cur) => sum + cur)
        return args
    }

    return fn;
}

function currying(fn, ...args) {
    const length = fn.length;
    let allArgs = [...args];
    const res = (...newArgs) => {
        allArgs = [...allArgs, ...newArgs];
        if (allArgs.length === length) {
            return fn(...allArgs);
        } else {
            return res;
        }
    };
    return res;
}

const add = (a, b, c) => a + b + c;
const a = currying(add, 1);
// console.log(a(2,3))

calculate(2)(3)('*')
calculate(2)(3)('+')