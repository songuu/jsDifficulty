/*
 * @Author: songyu
 * @Date: 2021-05-31 20:47:42
 * @LastEditTime: 2021-05-31 20:54:36
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\面试题测试\手写\手写函数方法.js
 */
Function.prototype.apply = function (context = window, args) {
    if (typeof this !== "function") {
        throw new TypeError("类型错误")
    }

    const fn = Symbol('fn');

    context[fn] = this;

    const res = context[fn](...args);

    delete context[fn];

    return res
}

Function.prototype.call = function (context = window, args) {
    if (typeof this !== "function") {
        throw new TypeError("类型错误")
    }

    const fn = Symbol('fn');

    context[fn] = this;

    const res = context[fn](...args);

    delete context[fn];

    return res
}

Function.prototype.bind = function (context, ...args) {
    if (typeof this !== "function") {
        throw new TypeError("类型错误")
    }

    let self = this;

    return function F() {
        if (this instanceof F) {
            return new self(...args, ...arguments)
        }

        return self.apply(context, [...args, ...arguments])
    }
}