/* 
  使用promise每隔1s输出1，2，3
*/
const arr = [1, 2, 3]

arr.reduce((p, x) => {
  return p.then(() => {
    return new Promise((r) => {
      setTimeout(() => r(console.log(x)), 1000)
    })
  })
}, Promise.resolve())
```
Promise.resolve()
  .then(() => {
    return new Promise(r => {
      setTimeout(() => {
        r(console.log(1))
      }, 1000)
    })
  })
  .then(r => {
    return new Promise(r => {
      setTimeout(() => {
        r(console.log(2))
      }, 1000)
    })
  })
  .then(r => {
    return new Promise(r => {
      setTimeout(() => {
        r(console.log(3))
      }, 1000)
    })
  })
```

/* 
  使用promise1s之后同时输出1，2，3
  原因主要在于promise.then()会出现透传的情况
*/
const result = arr.reduce(
  (p, x) =>
    p.then(new Promise((r) => setTimeout(() => r(console.log(x)), 1000))),
  Promise.resolve()
)
```
Promise.resolve()
  .then(new Promise(r => {
    setTimeout(() => {
      r(console.log(1))
    }, 1000)
  }))
  .then(new Promise(r => {
    setTimeout(() => {
      r(console.log(2))
    }, 1000)
  }))
  .then(new Promise(r => {
    setTimeout(() => {
      r(console.log(3))
    }, 1000)
  }))
```

/* 
  promise.then(() => {})   传入的是一个函数  就会进入接下来的执行过程
  promise.then({}) 传入的是一个可执行的结果
  在处理new Promise 里面的setTimeout的时间 会出现 promise.then() 透传的情况 会将后面的结构推到一个数组里面
  然后都是延迟1s执行，函数执行的间隔可以忽略，所以就会直接输出1，2，3
*/
