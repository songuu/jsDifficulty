/*
 * @Author: songyu
 * @Date: 2021-06-07 09:35:38
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-07 09:36:20
 */

// * 动态规划
const lengthOfLIS = function (nums) {
  let n = nums.length
  if (n == 0) {
    return 0
  }
  let dp = new Array(n).fill(1)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)
}

// * 贪心 + 二分查找
const lengthOfLIS = function (nums) {
  let len = nums.length
  if (len <= 1) {
    return len
  }
  let tails = [nums[0]]
  for (let i = 0; i < len; i++) {
    // 当前遍历元素 nums[i] 大于 前一个递增子序列的 尾元素时，追加到后面即可
    if (nums[i] > tails[tails.length - 1]) {
      tails.push(nums[i])
    } else {
      // 否则，查找递增子序列中第一个大于当前值的元素，用当前遍历元素 nums[i] 替换它
      // 递增序列，可以使用二分查找
      let left = 0
      let right = tails.length - 1
      while (left < right) {
        let mid = (left + right) >> 1
        if (tails[mid] < nums[i]) {
          left = mid + 1
        } else {
          right = mid
        }
      }
      tails[left] = nums[i]
    }
  }
  return tails.length
}
