/*
 * @Author: songyu
 * @Date: 2021-06-08 20:50:15
 * @LastEditTime: 2021-06-08 22:32:17
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\面试题测试\上海星面试题测试.js
 */
// 随机数返回
function rand(a, b) {
    let range = b - a;
    let rand = Math.random();

    return a + Math.round(rand * range)
}

// console.log(rand(-10, 10))

// promise测试
new Promise((resolve, reject) => {
    reject(resolve(1) || 0);
})
    .then(x => Promise.reject(x), x => Promise.reject(x + 2))
    .then(x => console.log(x), x => console.log(x))

// 作用域问题
var a = {
    name: "张三",
    getFunction() {
        return {
            name: "方法",
            show() {
                console.log(this.name) // 绑定在谁 就是谁
            },
            showMe: () => {
                console.log(this.name) // bind(b)
            }
        }
    }
}

var b = {
    name: "李四"
}

var c = a.getFunction();
b.show = a.getFunction().show;
b.showMe = a.getFunction().showMe;
// b.show();
// b.showMe();
// c.show(); === a.getFunction().show();
// c.showMe(); === a.getFunction().showMe();

/* let i; for (i = 0; i < 3; i++) {
    const log = () => { console.log(i); }
    setTimeout(log, 100);
} */

for (let i = 0; i < 2; i++) {
    var j = 2 - i;
    setTimeout(function() {
        console.log(i, j)
    })
}
// 01 11
for (let i = 0; i < 2; i++) {
    let j = 2 - i;
    setTimeout(function() {
        console.log(i, j)
    })
}
// 02 11