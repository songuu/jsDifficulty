/* 深复制 */
// 1.
function copyObject(orig) {
  return Object.create(
      Object.getPrototypeOf(orig),
      Object.getOwnPropertyDescriptors(orig)
  )
}

// 2.