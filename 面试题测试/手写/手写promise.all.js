/* 
    promise.all  需要将传入的执行完成才能
*/

Promise.prototype.all = function (promises) {
    promises = Array.from(promises);
    let len = promises.length;

    let res = [];

    let count = 0;

    return new Promise((resolve, reject) => {
        promises.forEach((promise, index) => {
            Promise.resolve(promise).then((result) => {
                count++;

                res[index] = result;

                if (count === len) {
                    return res;
                }
            }).catch(err => {
                reject(err)
            })
        });
    })
}