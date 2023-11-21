function findMax(arr) {
  if (!arr.length) return

  let hash = {}

  let max = arr[0]

  for (let i = 0, len = arr.length; i < len; i++) {
    if (hash[arr[i]]) {
      hash[arr[i]].push(i)

      if (hash[arr[i]].length > hash[max].length) {
        max = arr[i]
      }
    } else {
      hash[arr[i]] = [i]
    }
  }

  return [max, hash[max]]
}

function findMax1(arr) {
  if (!arr.length) return

  return arr.reduce(function (prev, cur, index) {
    prev[cur] ? prev[cur].push(index) : (prev[cur] = [index])
    return prev;
  }, {})
}

let a = findMax1([1, 2, 3, 1, 1, 1, 2, 4, 2, 2, 2])

console.log(a)
