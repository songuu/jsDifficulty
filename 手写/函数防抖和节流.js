/*
 * @Author: songyu
 * @Date: 2021-05-31 21:00:41
 * @LastEditTime: 2021-06-24 17:13:07
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\面试题测试\手写\函数防抖和节流.js
 */
// 防抖
// 输入框事件
const debounce = (fn, time) => {
    let timeout = null;
    return function () {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            fn.apply(this, arguments)
        }, time)
    }
}

// 节流
// 页面滚动
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