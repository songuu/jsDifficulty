/*
 * @Author: songyu
 * @Date: 2021-05-31 20:47:42
 * @LastEditTime: 2021-06-03 10:50:07
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: \项目文件\jsDifficulty\面试题测试\手写\手写函数方法.js
 */
Function.prototype.apply = function (context = window, args) {
  if (typeof this !== 'function') {
    throw new TypeError('类型错误')
  }

  const fn = Symbol('fn')

  context[fn] = this

  const res = context[fn](...args)

  delete context[fn]

  return res
}

Function.prototype.call = function (context = window, args) {
  if (typeof this !== 'function') {
    throw new TypeError('类型错误')
  }

  const fn = Symbol('fn')

  context[fn] = this

  const res = context[fn](...args)

  delete context[fn]

  return res
}

Function.prototype.bind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('类型错误')
  }

  let self = this

  return function F() {
    if (this instanceof F) {
      return new self(...args, ...arguments)
    }

    return self.apply(context, [...args, ...arguments])
  }
}

Function.prototype.mybind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('类型错误')
  }

  let fn = Symbol("fn");
  context[fn] = this;

  let self = this;

  const result = function(...innerArgs) {
      if(this instanceof self === true) {
        this[fn] = self;
        this[fn](...[...args, ...innerArgs]);
        delete this[fn];
      } else {
        context[fn](...[...args, ...innerArgs]);
        delete context[fn];
      }
  }

  result.prototype = Object.create(this.prototype);
  return result;
}
