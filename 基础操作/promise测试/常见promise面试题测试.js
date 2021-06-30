/*
 * @Author: songyu
 * @Date: 2021-05-17 21:04:53
 * @LastEditTime: 2021-05-17 21:27:39
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\promise测试\常见promise面试题测试.js
 */
/* 
* 1  => 
begin
end
timeout1
promise1
promise2
timeout2
1111
*/
console.log("begin")
setTimeout(() => {
    console.log("timeout1")

    Promise.resolve().then(() => {
        console.log("promise1");

        setTimeout(() => {
            Promise.resolve().then(() => {
                console.log(1111)
            })

            console.log("timeout2")
        })
    }).then(() => {
        console.log("promise2")
    })
}, 0)

console.log("end")

/*
* 2   =>  
foo
*/

Promise.resolve("foo").then(Promise.resolve("bar")).then(res => {
    console.log(res)
}).then(res => {
    console.log(res)
})

/* 
* 3
111
444
222
333
*/
console.log(111)
requestAnimationFrame(() => {
    console.log(222)
})

setTimeout(() => {
    console.log(333)
}, 0)

Promise.resolve(444).then(res => console.log(res))

/* 
* 手动实现promise相关
*/

// * promise.all
// 输入不仅仅只有Array
function promiseAll(args) {
    return new Promise((resolve, reject) => {
        const promiseResults = [];
        let iteratorIndex = 0;
        // 已完成的数量，用于最终的返回，不能直接用完成数量作为iteratorIndex
        // 输出顺序和完成顺序是两码事
        let fullCount = 0;
        // 用于迭代iterator数据
        for (const item of args) {
            // for of 遍历顺序，用于返回正确顺序的结果
            // 因iterator用forEach遍历后的key和value一样，所以必须存一份for of的 iteratorIndex
            let resultIndex = iteratorIndex;
            iteratorIndex += 1;
            // 包一层，以兼容非promise的情况
            Promise.resolve(item).then(res => {
                promiseResults[resultIndex] = res;
                fullCount += 1;
                // Iterator 接口的数据无法单纯的用length和size判断长度，不能局限于Array和 Map类型中
                if (fullCount === iteratorIndex) {
                    resolve(promiseResults)
                }
            }).catch(err => {
                reject(err)
            })
        }
        // 处理空 iterator 的情况
        if (iteratorIndex === 0) {
            resolve(promiseResults)
        }
    }
    )
}
if (!Promise.all) Promise.all = promiseAll;

// * 手动实现promise相关
class Promise {
    constructor(executor) {
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];
        let resolve = value => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
        };
        let reject = reason => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        };
        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
        let promise2 = new Promise((resolve, reject) => {
            if (this.state === 'fulfilled') {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            };
            if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0);
            };
            if (this.state === 'pending') {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0);
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)
                });
            };
        });
        return promise2;
    }
    catch(fn) {
        return this.then(null, fn);
    }
}
function resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
        return reject(new TypeError('Chaining cycle detected for promise'));
    }
    let called;
    if (x != null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, err => {
                    if (called) return;
                    called = true;
                    reject(err);
                })
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}
//resolve方法
Promise.resolve = function (val) {
    return new Promise((resolve, reject) => {
        resolve(val)
    });
}
//reject方法
Promise.reject = function (val) {
    return new Promise((resolve, reject) => {
        reject(val)
    });
}
//race方法 
Promise.race = function (promises) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(resolve, reject)
        };
    })
}
//all方法(获取所有的promise，都执行then，把结果放到数组，一起返回)
Promise.all = function (promises) {
    let arr = [];
    let i = 0;
    function processData(index, data) {
        arr[index] = data;
        i++;
        if (i == promises.length) {
            resolve(arr);
        };
    };
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promises.length; i++) {
            promises[i].then(data => {
                processData(i, data);
            }, reject);
        };
    });
}