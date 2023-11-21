let rIC, cIC

let rICCallbacks = new Map()
let frameDeadline = 0

rIC = function (callback) {
  const currentTime = Date.now()
  const idleCallbackId = ++nextIdleCallbackId
  rICCallbacks.set(idleCallbackId, {
    callback,
    time: currentTime,
  })
  return idleCallbackId
}

cIC = function (id) {
  rICCallbacks.delete(id)
}

let animationFrameId = null
let nextIdleCallbackId = 0

function frameDeadlineObject() {
  const currentTime = Date.now()
  return {
    didTimeout: false,
    timeRemaining: () => Math.max(0, 50 - (currentTime - frameDeadline)),
  }
}

function idleTick() {
  frameDeadline = Date.now() + 50
  const allCallbacks = Array.from(rICCallbacks.values())
  for (let i = 0; i < allCallbacks.length; i++) {
    const { callback, time } = allCallbacks[i]
    if (time < frameDeadline) {
      rICCallbacks.delete(allCallbacks[i])
      callback(frameDeadlineObject())
    }
  }
  if (rICCallbacks.size > 0) {
    animationFrameId = requestAnimationFrame(idleTick)
  } else {
    animationFrameId = null
  }
}

// Schedule the first animation frame to kick off the idleTick loop.
animationFrameId = requestAnimationFrame(idleTick)

module.exports = {
  requestIdleCallback: rIC,
  cancelIdleCallback: cIC,
}
