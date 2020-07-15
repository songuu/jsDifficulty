function limitLoad(urls, handler, limit) {
  let sequence = [].concat(urls) // 复制urls
  // 这一步是为了初始化 promises 这个"容器"
  let promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      // 返回下标是为了知道数组中是哪一项最先完成
      return index
    })
  })
  // 注意这里要将整个变量过程返回，这样得到的就是一个Promise，可以在外面链式调用
  return sequence
    .reduce((pCollect, url) => {
      return pCollect
        .then(() => {
          return Promise.race(promises) // 返回已经完成的下标
        })
        .then((fastestIndex) => {
          // 获取到已经完成的下标
          // 将"容器"内已经完成的那一项替换
          promises[fastestIndex] = handler(url).then(() => {
            return fastestIndex // 要继续将这个下标返回，以便下一次变量
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }, Promise.resolve()) // 初始化传入
    .then(() => {
      // 最后三个用.all来调用
      return Promise.all(promises)
    })
}
limitLoad(urls, loadImg, 3)
  .then((res) => {
    console.log('图片全部加载完毕')
    console.log(res)
  })
  .catch((err) => {
    console.error(err)
  })
