/*
 * @Author: songyu
 * @Date: 2021-05-20 15:10:48
 * @LastEditor: songyu
 * @LastEditTime: 2021-05-20 18:03:53
 */
/*
 * 计算数组里面n个数之和为number的情况
 */

var twoSum = function (nums, target) {
  let arr = [...nums]
  let i = arr.length
  while (i > 0) {
    let first = arr.shift()
    console.log(first)
    console.log(arr)
    let len = nums.length - arr.length
    console.log(len)
    if (arr.includes(target - first)) {
      return [nums.indexOf(first), len + arr.indexOf(target - first)]
    }
    i--
  }
}

var twoSum1 = function (nums, target) {
  let len = nums.length
  // 创建 MAP
  const MAP = new Map()
  // 由于第一个元素在它之前一定没有元素与之匹配，所以先存入哈希表
  MAP.set(nums[0], 0)
  for (let i = 1; i < len; i++) {
    // 提取共用
    let other = target - nums[i]
    // 判断是否符合条件，返回对应的下标
    if (MAP.get(other) !== undefined) return [MAP.get(other), i]
    // 不符合的存入hash表
    MAP.set(nums[i], i)
  }
}

var twoSum2 = function (nums, target) {
  let len = nums.length

  let obj = {}

  for (let i = 0; i < len; i++) {
    let other = target - nums[i]

    if (obj[other]) {
      return [obj[other], i]
    }

    obj[nums[i]] = i
  }
}

const isTargetWithSomeNumber = (nums, target) => {
  if (nums.length === 0) {
    return []
  }
  let arr = [],
    len = nums.length

  for (let i = 0; i < len; i++) {
    for (let j = i; j < len; j++) {
      if (nums[i] + nums[j] === target) {
        arr.push([i, j])
      }
    }
  }

  return arr
}

let nums = [2,7,11,15]


let result = twoSum1(nums, 9)

console.log(result)
