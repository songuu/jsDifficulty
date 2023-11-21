/*
 * 链式调用
 * 洋葱模型
 */

function miniRedux() {}

// 给普通函数增加中间件
const createFuncWithMiddware = (func, middlewares) => {
  const compose = (fns) => fns.reduce((a, b) => (args) => a(b(args)))

  const applyMiddware = (store, middlewares) => {
    const fns = middlewares.map((middleware) => middleware(store))
    store.dispatch = compose(fns)(store.dispatch)
  }

  // 按照 store 的模式直接创建一个
  const store = {
    getState: () => {},
    // dispatch 指定为目标函数
    dispatch: func,
  }

  applyMiddware(store, middlewares)

  return store.dispatch
}

const sum = (a, b) => {
  return a + b
}

const log =
  (dispatch) =>
  (...args) => {
    console.log('before')
    const res = dispatch(...args)
    console.log('after')
    return res
  }

const dispatch = createFuncWithMiddware(sum, [log])
dispatch(1, 2)