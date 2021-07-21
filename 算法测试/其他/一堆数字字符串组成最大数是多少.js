/*
 * @Author: songyu
 * @Date: 2021-05-25 11:45:36
 * @LastEditor: songyu
 * @LastEditTime: 2021-05-25 14:14:00
 */
// 一堆数字字符串组成最大数是多少[50, 2, 5, 9] => 95502 (贪心)
function makeArrayBig(nums) {
  if (!nums || !Array.isArray(nums)) {
    return 0
  }

  function permute1(nums) {
    let res = []
    perm(nums, 0, nums.length - 1, res)
    return res
  }

  function perm(arr, p, q, res) {
    if (p === q) {
      res.push([...arr])
    } else {
      for (let i = p; i <= q; i++) {
        swap(arr, i, p)
        perm(arr, p + 1, q, res)
        swap(arr, i, p)
      }
    }
  }

  function swap(arr, p, q) {
    ;[arr[p], arr[q]] = [arr[q], arr[p]]
  }

  return permute1(nums)
}

let a = makeArrayBig([50, 2, 5, 9])

console.log(a)
