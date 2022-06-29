// [1,2,3,1,2,4,1,3,2,1] [1,2] [3,4,5] =>[3,4,5,3,3,4,5,4,1,3,2,1]

// 说明：第一个输入是原始数组，第二个输入是一个条件：要在原始数组中的连续数组，第三个输入是要替换掉原数组符合参数二条件的数据

const find = (arr, target, replace) => {
  const result = target.join('')

  const r = []

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      const res = arr[i] + '' + arr[j]
      if (res === result) {
        r.push([i, j])
      } else {
        if (res.length < result.length) {
          continue
        } else {
          break
        }
      }
    }
  }

  if (r.length) {
    const del = target.length - replace.length

    for (let i = 0; i < r.length; i++) {
      arr.splice(
        r[i][0] === 0 ? r[i][0] : r[i][0] + del,
        target.length,
        replace
      )
    }

    return arr
  }

  return []
}

const res = find([1, 2, 3, 1, 2, 4, 1, 3, 2, 1], [1, 2], [3, 4, 5])

console.log(res.flat())
