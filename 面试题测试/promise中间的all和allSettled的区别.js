const promise1 = Promise.resolve(1)
const promise2 = 33 // Promise.reject('lala')
const promise3 = new Promise((resolve) => {
  setTimeout(resolve, 100, 'foo')
})

Promise.all([promise1, promise2, promise3])
  .then((values) => {
    console.log(values)
  })
  .catch((err) => {
    console.log(err)
  })

Promise.allSettled([promise1, promise2, promise3]).then((values) => {
  console.log(values)
})
