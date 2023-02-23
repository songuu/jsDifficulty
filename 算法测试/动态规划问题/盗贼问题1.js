/* 
你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都围成一圈，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。

给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

*/

/* 
也可以拆分为两个问题 0 - （n - 1） 和 1 - n
*/

var rob = function (nums) {
  if (nums.length === 0) return 0
  if (nums.length === 1) return nums[0]
  let dp1 = new Array(nums.length).fill(0)
  let dp2 = new Array(nums.length).fill(0)
  dp1[0] = 0
  dp2[0] = 0
  dp1[1] = nums[0]
  dp2[1] = nums[1]
  for (let i = 2; i < nums.length; ++i) {
    dp1[i] = Math.max(dp1[i - 1], nums[i - 1] + dp1[i - 2])
  }
  for (let i = 2; i < nums.length; ++i) {
    dp2[i] = Math.max(dp2[i - 1], nums[i] + dp2[i - 2])
  }
  return Math.max(dp1[nums.length - 1], dp2[nums.length - 1])
}

var rob = function (nums) {
  let len = nums.length

  if (len === 0) return 0
  if (len === 1) return nums[0]
  if (len === 2) return Math.max(nums[0], nums[1])

  let dp = new Array(len).fill(0)
  let dp1 = new Array(len).fill(0)
  // 需要拆分为两种情况
  // 1.选择第一个
  // 2.没有选择第一个
  // 最后结果取两种的最大值

  dp[0] = 0
  dp[1] = nums[1]
  dp1[0] = nums[0]
  dp1[1] = Math.max(nums[0], nums[1])

  // 选择了第一个
  for (let i = 2; i < len; i++) {
    dp[i] = Math.max(dp[i - 1], nums[i] + dp[i - 2])
  }

  // 没有选择第一个
  for (let i = 2; i < len - 1; i++) {
    dp1[i] = Math.max(dp1[i - 1], nums[i] + dp1[i - 2])
  }

  return Math.max(dp[len - 1], dp1[len - 2])
}
