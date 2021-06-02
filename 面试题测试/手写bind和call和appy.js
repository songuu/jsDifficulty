/*
 * @Author: songyu
 * @Date: 2021-05-27 10:14:09
 * @LastEditor: songyu
 * @LastEditTime: 2021-05-27 10:15:52
 */
// * call
Function.prototype.myCall = function () {
  // 判断this是否为函数
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  let [context, ...args] = [...arguments]
  context = context ? context : window
  // 将方法添加到对象中
  context.fn = this
  const result = context.fn(...args)
  // 执行完后删除方法，保证对象不变
  delete context.fn
  return result
}

// * apply
Function.prototype.myApply = function () {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  // 这里的args是数组
  let [context, args] = [...arguments]
  context = context ? context : window
  context.fn = this
  const result = context.fn(...args)
  delete context.fn
  return result
}

// * bind
Function.prototype.myBind = function () {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  let [context, ...args] = [...arguments]
  context = context ? context : window
  const fn = this
  return function F() {
    //因为返回了一个函数，可以new F(),所以需要判断
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    // 因为返回的函数，调用时可以传参
    return fn.apply(context, [...args, ...arguments])
  }
}
