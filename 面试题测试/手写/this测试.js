/*
 * @Author: songyu
 * @Date: 2021-06-02 20:29:04
 * @LastEditTime: 2021-06-02 20:49:49
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\面试题测试\手写\this测试.js
 */

// 寻找到与箭头函数平级的父元素的执行上下文
function fn() {
    console.log(this)
    const a = () => {
        console.log(this)
    }

    const obj = {
        name: "inner",
        a: a
    }
    a();
    obj.a()
}

const obj = {
    name: "outer",
    fn: fn
}

obj.fn()


let birth = 1;
var obj1 = {
    birth: 1990,
    getAge: function() {
        // console.log(this)
        var b = this.birth;

        // console.log(b)
        var fn = () => new Date().getFullYear() - this.birth;

        return fn();
    }
}
let b = obj1.getAge();

// console.log(b)
