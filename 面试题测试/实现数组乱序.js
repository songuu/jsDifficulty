// function shuffle(arr) {
//   let new_arr = arr.map((i) => ({ v: i, r: Math.random() }))
//   new_arr.sort((a, b) => a.r - b.r)
//   arr.splice(0, arr.length, ...new_arr.map((i) => i.v))
// }

// let a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// let n = 10000
// let count = new Array(a.length).fill(0)

// for (let i = 0; i < n; i++) {
//   shuffle(a)
//   count[a.indexOf('a')]++
// }

// 固定数组
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

function fisherYatesShuffle(array) {
  let currentIndex = array.length

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ]
  }
}

// 生成随机数
let a = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
let n = 10000
let count = new Array(a.length).fill(0)

for (let i = 0; i < n; i++) {
  const shuffledArray = [...a] // 创建原数组的副本以保持原数组不受影响
  fisherYatesShuffle(shuffledArray)
  count[shuffledArray.indexOf('a')]++
}

// lodash实现
function shuffle(array) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  let index = -1
  const lastIndex = length - 1
  const result = array // copyArray(array)
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    // const value = result[rand]
    // result[rand] = result[index]
    // result[index] = value
    ;[result[rand], result[index]] = [result[index], result[rand]]
  }
  return result
}

console.log('shuffle: ', shuffle([1, 2, 3, 4, 5]))
