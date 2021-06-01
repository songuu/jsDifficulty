/*
 * @Author: songyu
 * @Date: 2021-05-31 21:09:48
 * @LastEditTime: 2021-05-31 21:12:53
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
        return args.reduce((sum, cur) => sum + cur)
    }

    return fn;
}

let a = curry(1)(1,2,3)(2)

console.log(a)