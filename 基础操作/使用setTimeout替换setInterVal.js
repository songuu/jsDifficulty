/*
 * @Author: songyu
 * @Date: 2021-05-24 16:08:05
 * @LastEditor: songyu
 * @LastEditTime: 2021-05-24 16:08:30
 */
let timer = null
function interval(func, wait) {
  let interv = function () {
    func.call(null)
    timer = setTimeout(interv, wait)
  }
  timer = setTimeout(interv, wait)
}

let lastTime = 0

function setIntervalWithRAF(callback, interval) {
  function frame(time) {
    if (time - lastTime >= interval) {
      callback()
      lastTime = time
    }
    requestAnimationFrame(frame)
  }

  requestAnimationFrame(frame)
}

// 使用示例
const intervalId = setIntervalWithRAF(() => {
  console.log('Hello at animation frame interval')
}, 2000)
