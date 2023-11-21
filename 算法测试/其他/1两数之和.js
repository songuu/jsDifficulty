var twoSum = function (nums, target) {
  let len = nums.length

  let arr = []
  // 创建 MAP
  const MAP = new Map()
  // 由于第一个元素在它之前一定没有元素与之匹配，所以先存入哈希表
  MAP.set(nums[0], 0)
  for (let i = 1; i < len; i++) {
    // 提取共用
    let other = target - nums[i]
    // 判断是否符合条件，返回对应的下标
    if (MAP.get(other) !== undefined) arr.push([MAP.get(other), i])
    // 不符合的存入hash表
    MAP.set(nums[i], i)
  }

  return arr
}

var twoSum1 = function (nums, target) {
  let hash = {}

  let arr = []

  hash[nums[0]] = 0
  for (let i = 1; i < nums.length; i++) {
    let other = target - nums[i]

    if (hash[other] || hash[other] == 0) arr.push([hash[other], i])

    hash[nums[i]] = i
  }
  return arr
}

let a = twoSum1([2, 7, 11, 15, 3, 6], 9)
console.log(a)
