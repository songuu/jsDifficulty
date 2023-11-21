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