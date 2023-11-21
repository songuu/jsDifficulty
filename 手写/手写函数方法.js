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

Function.prototype.myApply = function (context, args) {
  if (!context || context === null) {
    context = window;
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
  context[fn] = this;
  // 执行函数并返回结果
  return context[fn](...args);
};

Function.prototype.call = function (context = window, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('类型错误')
  }

  const fn = Symbol('fn')

  context[fn] = this

  const res = context[fn](...args)

  delete context[fn]

  return res
}

Function.prototype.myCall = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }
  // 创造唯一的key值  作为我们构造的context内部方法名
  let fn = Symbol();
  context[fn] = this; //this指向调用call的函数
  // 执行函数并返回结果 相当于把自身作为传入的context的方法进行调用了
  return context[fn](...args);
};

Function.prototype.bind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('类型错误')
  }

  let self = this

  return function F() {
    // 直接调用了new
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
