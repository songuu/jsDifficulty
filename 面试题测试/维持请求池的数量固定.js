function multiRequest(urls, maxNum) {
    const len = urls.length; // 请求总数量
    const res = new Array(len).fill(0); // 请求结果数组
    let sendCount = 0; // 已发送的请求数量
    let finishCount = 0; // 已完成的请求数量
    return new Promise((resolve, reject) => {
        // 首先发送 maxNum 个请求，注意：请求数可能小于 maxNum，所以也要满足条件2
        while (sendCount < maxNum && sendCount < len) {
            next();
        }
        function next() {
            let current = sendCount++; // 当前发送的请求数量，后加一
            if (finishCount >= len) { // 如果所有请求完成，则解决掉 Promise，终止递归
                resolve(res);
                return;
            }
            const url = urls[current];
            fetch(url).then(result => {
                finishCount++;
                res[current] = result;
                if (current < len) { // 如果请求没有发送完，继续发送请求
                    next();
                }
            }, err => {
                finishCount++;
                res[current] = err;
                if (current < len) { // 如果请求没有发送完，继续发送请求
                    next();
                }
            });
        }
    });
}