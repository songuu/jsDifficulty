/*
题目：请实现如下函数，可以批量请求数据。所有的url地址都在urls参数中，同时可以通过max控制请求的并发度，当所有请求结束后，调用callback回调函数。请求直接用fetch就可以。
*/

/* 
    原理
    并发度如果为N，就建立10个promise，每个promise都在执行请求，10个promise公用请求池，里面有t个请求要发送。每个promise执行完毕后都会再从请求池里拉取新的请求去执行，10个promise在一起，外层有一个promise.all。10个都执行完毕，就执行回调callback
*/

var urls = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
const limit = 5;

function sendRequest(urls, limit, callback) {
    function _send(urls) {
        const url = urls.shift();
        if (url) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log(`当前发送：${url}`);
                    resolve(url);
                }, 10)
            })
                .finally(() => {
                    if (urls.length > 0) {
                        return _send(urls)
                    }
                })
        }

    }
    let asyncList = [];
    while (limit--) {
        asyncList.push(_send(urls));
    }
    return Promise.all(asyncList).then(callback);
}

async function sendRequest(urls, max) {
    return new Promise(resolve => {
        const len = urls.length;
        let idx = 0;
        let counter = 0;
        const start = async () => {
            // 有请求，有通道
            while (idx < len && max > 0) {
                max--; // 占⽤通道
                console.log(idx, "start");
                const form = urls[idx].form;
                const index = urls[idx].index;
                idx++
                /* request({
                    url: '/upload',
                    data: form,
                    onProgress: this.createProgresshandler(this.chunks[index]),
                    requestList: this.requestList
                }).then(() => {
                    max++; // 释放通道
                    counter++;
                    if (counter === len) {
                        resolve();
                    } else {
                        start();
                    }
                }); */
            }
        }
        start();
    });
}

sendRequest(urls, limit, function () {
    console.log('请求发送完成')
});