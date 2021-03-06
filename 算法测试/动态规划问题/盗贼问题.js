/*
    你是一个专业的小偷，计划偷窃沿街的房屋。
    每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
    给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额
*/
/* 
    选择第i个房间，就不能选择第i-1个房间
    不选择第i个房间，就只考虑前i-1个房间

    状态转移方程
    dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])   i >= 3
*/

// 利用奇偶性（不相邻）
var rob = function (nums) {
  var oddSum = 0
  var evenSum = 0
  for (var i = 0; i < nums.length; i++) {
    if (i % 2 == 0) {
      evenSum = Math.max(evenSum + nums[i], oddSum)
    } else {
      oddSum = Math.max(oddSum + nums[i], evenSum)
    }
  }
  return Math.max(oddSum, evenSum)
}

var rob = function (nums) {
  if (nums.length === 0) return 0
  if (nums.length === 1) return nums[0]
  let dp = new Array(nums.length).fill(0)
  dp[0] = 0
  dp[1] = nums[1]
  dp[2] = Math.max(nums[0], nums[1])

  for (let i = 3; i < nums.length; ++i) {
    dp1[i] = Math.max(dp1[i - 1], nums[i] + dp1[i - 2])
  }

  return dp[len]
}
