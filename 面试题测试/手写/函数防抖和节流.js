/*
 * @Author: songyu
 * @Date: 2021-05-31 21:00:41
 * @LastEditTime: 2021-05-31 21:06:14
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\面试题测试\手写\函数防抖和节流.js
 */

const debounce = (fn, time) => {
    let timeout = null;
    return function () {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn.apply(this, arguments)
        }, time)
    }
}

const throttle = (fn, time) => {
    let flag = true

    return function () {
        if (!flag) return;

        flag = false;

        setTimeout(() => {
            fn.apply(this, arguments);
            flag = true;
        }, time)
    }
}