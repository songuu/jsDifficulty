const curry = (...args) => {
  function fn() {
    args.push(...arguments)

    return fn
  }

  fn.toString = function () {
    return args.reduce((sum, cur) => sum + cur)
  }

  return fn
}

function currying(fn, ...args) {
  const length = fn.length
  let allArgs = [...args]
  const res = (...newArgs) => {
    allArgs = [...allArgs, ...newArgs]
    if (allArgs.length === length) {
      return fn(...allArgs)
    } else {
      return res
    }
  }
  return res
}

const add = (a, b, c) => a + b + c
const a = currying(add, 1)
console.log(a(2, 3))

/* calculate(2)(3)('*')
calculate(2)(3)('+') */
