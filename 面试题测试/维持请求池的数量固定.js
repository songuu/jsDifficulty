// function multiRequest(urls, maxNum) {
//   const len = urls.length // 请求总数量
//   const res = new Array(len).fill(0) // 请求结果数组
//   let sendCount = 0 // 已发送的请求数量
//   let finishCount = 0 // 已完成的请求数量
//   return new Promise((resolve, reject) => {
//     // 首先发送 maxNum 个请求，注意：请求数可能小于 maxNum，所以也要满足条件2
//     while (sendCount < maxNum && sendCount < len) {
//       next()
//     }
//     function next() {
//       let current = sendCount++ // 当前发送的请求数量，后加一
//       if (finishCount >= len) {
//         // 如果所有请求完成，则解决掉 Promise，终止递归
//         resolve(res)
//         return
//       }
//       const url = urls[current]
//       fetch(url).then(
//         (result) => {
//           finishCount++
//           res[current] = result
//           if (current < len) {
//             // 如果请求没有发送完，继续发送请求
//             next()
//           }
//         },
//         (err) => {
//           finishCount++
//           res[current] = err
//           if (current < len) {
//             // 如果请求没有发送完，继续发送请求
//             next()
//           }
//         }
//       )
//     }
//   })
// }

// class RequestPool {
//   constructor(maxConcurrent) {
//     this.maxConcurrent = maxConcurrent // 最大并发请求数
//     this.currentRequests = 0 // 当前正在进行的请求数
//     this.queue = [] // 请求队列
//   }

//   // 添加请求到池中
//   add(requestFunction) {
//     return new Promise((resolve, reject) => {
//       // 请求包装器
//       const wrappedRequest = () => {
//         this.currentRequests++
//         requestFunction()
//           .then(resolve)
//           .catch(reject)
//           .finally(() => {
//             this.currentRequests--
//             if (this.queue.length > 0) {
//               // 如果队列中还有请求，继续处理下一个
//               const nextRequest = this.queue.shift()
//               nextRequest()
//             }
//           })
//       }

//       if (this.currentRequests < this.maxConcurrent) {
//         // 如果当前请求数量小于最大并发数，立即执行
//         wrappedRequest()
//       } else {
//         // 否则，将请求加入队列
//         this.queue.push(wrappedRequest)
//       }
//     })
//   }
// }

// class RequestPool1 {
//   constructor(maxConcurrent) {
//     this.maxConcurrent = maxConcurrent // 最大并发请求数
//     this.currentRequests = 0 // 当前正在进行的请求数
//     this.queue = [] // 请求队列
//   }

//   // 添加请求到池中
//   add(requestFunction) {
//     return new Promise((resolve, reject) => {
//       // 请求包装器
//       const wrappedRequest = () => {
//         this.currentRequests++
//         requestFunction()
//           .then(resolve)
//           .catch(reject)
//           .finally(() => {
//             this.currentRequests--
//             if (this.queue.length > 0) {
//               // 如果队列中还有请求，继续处理下一个
//               const nextRequest = this.queue.shift()
//               nextRequest()
//             }
//           })
//       }

//       if (this.currentRequests < this.maxConcurrent) {
//         // 如果当前请求数量小于最大并发数，立即执行
//         wrappedRequest()
//       } else {
//         // 否则，将请求加入队列
//         this.queue.push(wrappedRequest)
//       }
//     })
//   }
// }

// // 使用示例
// const pool = new RequestPool1(3) // 创建一个最大并发数为3的请求池

// // 示例请求函数
// function fetchDummyData(id) {
//   return new Promise((resolve) => {
//     console.log(`Requesting data for ${id}`)
//     setTimeout(() => resolve(`Data for ${id}`), 1000) // 假设每个请求需要1秒
//   })
// }

// // 添加请求到请求池
// for (let i = 0; i < 10; i++) {
//   pool.add(() => fetchDummyData(i)).then((data) => console.log(data))
// }

class RequestPool2 {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent // 最大并发请求数
    this.currentRequests = [] // 当前正在进行的请求列表
  }

  async add(requestFunction) {
    while (this.currentRequests.length >= this.maxConcurrent) {
      // 等待至少一个请求完成
      await Promise.race(this.currentRequests)
    }

    // 创建新请求
    const request = requestFunction().finally(() => {
      // 请求完成后从列表中移除
      this.currentRequests = this.currentRequests.filter((r) => r !== request)
    })

    this.currentRequests.push(request)
    return request
  }
}

// 使用示例
const pool1 = new RequestPool2(3)

// 示例请求函数
function fetchDummyData(id) {
  return new Promise((resolve) => {
    console.log(`Requesting data for ${id}`)
    setTimeout(() => resolve(`Data for ${id}`), 1000)
  })
}

// 添加请求到请求池
async function runRequests() {
  const requests = []
  for (let i = 0; i < 10; i++) {
    requests.push(pool1.add(() => fetchDummyData(i)))
  }
  const results = await Promise.all(requests)
  console.log(results)
}

runRequests()
