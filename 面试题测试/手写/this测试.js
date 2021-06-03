/*
 * @Author: songyu
 * @Date: 2021-06-02 20:29:04
 * @LastEditTime: 2021-06-03 14:36:01
 * @LastEditors: Please set LastEditors
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
    name: 'inner',
    a: a,
  }
  a()
  obj.a()
}

const obj = {
  name: 'outer',
  fn: fn,
}

obj.fn()

let birth = 1
var obj1 = {
  birth: 1990,
  getAge: function () {
    // console.log(this)
    var b = this.birth

    // console.log(b)
    var fn = () => new Date().getFullYear() - this.birth

    return fn()
  },
}
let b = obj1.getAge()

// console.log(b)

var x = 3
var foo = {
  x: 2,
  baz: {
    x: 1,
    bar: function () {
      return this.x // foo
    },
  },
}
var go = foo.baz.bar

console.log(go()) // 3
console.log(foo.baz.bar()) // 1

var x = 3
var foo = {
  x: 2,
  baz: {
    x: 1,
    bar: () => {
      return this.x // window
    },
  },
}
var go = foo.baz.bar

console.log(go()) // 3
console.log(foo.baz.bar()) // 3

var name = 'aaa'

var obj2 = {
  name: 'bbb',
  base: function () {
    this.name = 'ccc'
    return function () {
      return this.name
    }
  },
}
console.log(obj2.name)
console.log(obj2.base().call(this)) // 此时的name变为ccc 浏览器环境此时的this为window
console.log(obj2.name)

var a = 1
var obj3 = {
  b: 2,
}

var fn = function () {}
fn.c = 3

function test(x, y, z) {
  x = 4
  y.b = 5
  z.c = 6
  return z
}

test(a, obj3, fn)
console.log(a + obj3.b + fn.c)

const o1 = {
  text: 'o1',
  fn: function () {
    return this.text // o1 fn().call(o1)
  },
}

const o2 = {
  text: 'o2',
  fn: function () {
    return o1.fn() // o1 fn().call(o1)
  },
}

const o3 = {
  text: 'o3',
  fn: function () {
    var fn = o1.fn
    return fn() // undefined fn().call(window)
  },
}

o1.fn();
o2.fn();
o3.fn();

var a = 20;
var test = {
  a: 40,
  init: () => {
    console.log(this.a);
    function go() {
      console.log(this.a);
    }
    go.prototype.a = 50;
    return go;
  }
};

var p = test.init();
p();
new p();