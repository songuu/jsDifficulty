/**
 * 1.计算多个区间的交集
 *   区间用长度为2的数字数组表示，如[2, 5]表示区间2到5（包括2和5）；
 *   区间不限定方向，如[5, 2]等同于[2, 5]；
 *   实现`getIntersection 函数`
 *   可接收多个区间，并返回所有区间的交集（用区间表示），如空集用null表示
 * 示例：
 *   getIntersection([5, 2], [4, 9], [3, 6]); // [4, 5]
 *   getIntersection([1, 7], [8, 9]); // null
 */
function getIntersection() {
  let arrs = [...arguments]

  if (!arrs.length) return []

  arrs = arrs.map((arr) => arr.sort((a, b) => a - b))

  let len = arrs.length

  let hash = arrs[0]
  for (let i = 1; i < len; i++) {
    let left = arrs[i][0]
    let right = arrs[i][1]
    if (left > hash[1] || hash[0] > right) {
      return null
    }

    hash = [Math.max(hash[0], left), Math.min(hash[1], right)]
  }

  return hash
  //   return hash[0] === hash[1] &&  ? null : hash;
}

const getIntersection1 = function () {
  var result = {}
  var lists

  if (arguments.length === 1) {
    lists = arguments[0]
  } else {
    lists = arguments
  }

  lists = [...lists]

  for (let i = 0; i < lists.length; i++) {
    let min = Math.min(lists[i][0], lists[i][1])
    let max = Math.max(lists[i][0], lists[i][1])
    for (let j = min; j <= max; j++) {
      if (result[j] >= 0) {
        result[j]++
      } else {
        result[j] = 0
      }

      // result[j]=(result[j] || 0)+1
    }
  }

  let keys = Object.keys(result)
  keys = keys.filter((key) => result[key] == 2).map((key) => key - 0)

  console.log(keys.length ? keys : null)
}

function getIntersection2(...secs) {
  let len = secs.length,
    ans = null

  if (len === 0) return ans
  if (len === 1) return secs[0].sort((a, b) => a - b)
  ans = secs[0] // 以第一个区间作为参照

  for (var i = 1, l = secs.length; i < l; i++) {
    // 无交集 ans 最大值小于当前区间的最小值 / ans 的最小值大于当前区间的最大值
    if (
      Math.min(...secs[i]) > Math.max(...ans) ||
      Math.min(...ans) > Math.max(...secs[i])
    ) {
      return null
    }

    ans = [
      Math.max(Math.min(...ans), Math.min(...secs[i])),
      Math.min(Math.max(...ans), Math.max(...secs[i])),
    ]
  }

  return ans
}
let res = getIntersection([-2, 0], [0, 9])

console.log(res)
