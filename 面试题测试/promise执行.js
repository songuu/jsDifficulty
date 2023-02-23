const promiseSerial = (arr) => {
  let result = Promise.resolve()
  arr.forEach((item) => {
    result = result.then(item)
  })
  return result
}

const a = new Promise((resolve, reject) => resolve(1))
const b = new Promise((resolve, reject) => resolve(2))
const c = new Promise((resolve, reject) => resolve(3))

promiseSerial([a, b, c]).then((res) => {
  console.log(res)
})

// console.log(Object.prototype.toString.call(a))

const p = new Promise((resolve, reject) => {
  console.log(0)
  reject()
  console.log(1)
  resolve()
  console.log(2)
})
p.then((res) => {
  console.log(res)
  console.log(3)
})
  .then((res) => {
    console.log(4)
  })
  .catch((res) => {
    console.log(5)
  })
  .then((res) => {
    console.log(6)
  })
  .catch((res) => {
    console.log(7)
  })
  .then((res) => {
    console.log(8)
  })

const p1 = new Promise((resolve, reject) => {
  console.log(0)
  // throw new Error('error')
  reject()
}).catch((res) => {
  console.log(1)
}).then((res) => {
  console.log(2)
})
