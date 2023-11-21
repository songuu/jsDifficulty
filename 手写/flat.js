function flat(arr) {
  if (!arr.length) return arr

  let arrBox = []
  function makeFlat(arr1) {
    for (let i of arr1) {
      if (Array.isArray(i)) {
        makeFlat(i)
      } else {
        arrBox.push(i)
      }
    }
  }
  makeFlat(arr)

  return arrBox
}

function flatten(arr) {
  var res = []
  for (let i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      res = res.concat(flatten(arr[i]))
    } else {
      res.push(arr[i])
    }
  }
  return res
}

function flatten1(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

let a = flatten1([1, [2, 3], [4, [5, [6]]]])

console.log(a)
