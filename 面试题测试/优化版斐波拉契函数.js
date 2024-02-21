function trampoline(f) {
  while (f && f instanceof Function) {
    f = f()
  }
  return f
}

function fibonacci(n, ac1, ac2) {
  ;(ac1 = ac1 || 0), (ac2 = ac2 || 1)
  return n <= 1 ? ac2 : fibonacci.bind(null, n - 1, ac2, ac1 + ac2)
}

// 斐波拉契函数
function fibonacci(n, ac1 = 0, ac2 = 1) {
  return n <= 1 ? ac2 : fibonacci(n - 1, ac2, ac1 + ac2)
}

function ff(n) {
  return n === 1 || n === 0 ? n : ff(n - 1)
}
