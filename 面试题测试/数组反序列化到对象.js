/*
 * @Author: songyu
 * @Date: 2021-06-22 09:08:00
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-22 11:45:20
 */

/**
* 描述：给定一个数组，将其按特定规则反序列化为对象
* 示例：
deserialization([0, 'a', 1, 'b', 2, 'c', 3, 'e', 2, 'd', 1, 'x', 0, 'ff'])
=>
{
  a: {
    b: {
      c: {
        e: null
      },
      d: null
    },
    x: null
  },
  ff: null
}
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

    // * 保存的是最后清除的结果
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

    console.log(`当前的递归${n + 1}次, 结果是${finalArr}`)

    console.log(finalArr)

    finalArr.forEach((item, index) => {
      const val = cur[indexArr[index] + 1]
      if (!item.includes(n + 1)) {
        pre[val] = null
      } else {
        pre[val] = {}
        dfs(pre[val], n + 1, item)
      }
    })
  }
  dfs(res, 0, arr)
  return res
}

let arr = [0, 'a', 1, 'b', 2, 'c', 3, 'e', 2, 'd', 1, 'x', 0, 'ff']

/* let a = arr.reverse().reduce((pre, item) => ({ [item]: pre }), null)

console.log(a)*/

function deserialization1(arr) {
  let res = {}

  // 需要按照序列号进行递归
  function dfs(pre, n, cur) {
    // 找到当前下标的index
    // 终止条件是当前进入的数组不包含当前序列号
    if (!cur.includes(n)) {
      return
    }

    // 当前序列号对应的下标
    let indexArr = []
    for (let i = 0; i < cur.length; i++) {
      if (cur[i] === n) {
        indexArr.push(i)
      }
    }

    // 需要找到当前序列号需要遍历的数据
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

    // console.log(`当前的递归${n + 1}次, 结果是${finalArr}`)

    // console.log(finalArr)

    finalArr.forEach((item, index) => {
      // * 获取值
      const val = cur[indexArr[index] + 1]

      // * 如果不含有当前的下一个序列号
      if (!item.includes(n + 1)) {
        pre[val] = null
      } else {
        pre[val] = {}
        dfs(pre[val], n + 1, item)
      }
    })
  }

  dfs(res, 0, arr)

  return res;
}

let res = deserialization1(arr)

console.log(res)
