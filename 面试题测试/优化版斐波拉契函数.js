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
