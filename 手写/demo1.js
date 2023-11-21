/**
 * 递归分组
 * 1. 按照序列的大小执行
 */
function deserialization(arr) {
  let res = {}

  const dfs = (pre, n, cur) => {
    if (!cur.includes(n)) {
      return
    }
    let indexArr = []
    // * 找到当前的下标
    for (let i = 0; i < cur.length; i++) {
      if (cur[i] === n) {
        indexArr.push(i)
      }
    }

    // * 保存的是最后分组的结果
    let finalArr = []
    if (indexArr.length > 1) {
      for (let k = 1; k < indexArr.length + 1; k++) {
        if (k === indexArr.length) {
          finalArr.push(cur.slice(indexArr[k - 1]))
        } else {
          finalArr.push(cur.slice(indexArr[k - 1], indexArr[k]))
        }
      }
    } else {
      finalArr.push(cur.slice(indexArr[0]))
    }

    console.log('finalArr', finalArr)
  }

  dfs(res, 0, arr)
}

let arr = [0, 'a', 1, 'b', 2, 'c', 3, 'e', 2, 'd', 1, 'x', 0, 'ff']

let res = deserialization(arr)
