/* 深复制 */
// 1.
function copyObject(orig) {
  return Object.create(
      Object.getPrototypeOf(orig),
      Object.getOwnPropertyDescriptors(orig)
  )
}

// 2.
Object.assign({}, obj);

// 3.
JSON.parse(JSON.stringify(obj))

// 4.
for(let i in obj) {
  obj1[i] = obj[i]
}