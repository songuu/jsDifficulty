/* 
  给你一个整数数组 nums ，请你找出数组中乘积最大的连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。

  示例 1:

  输入: [2,3,-2,4]
  输出: 6
  解释: 子数组 [2,3] 有最大乘积 6。
  示例 2:

  输入: [-2,0,-1]
  输出: 0
  解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
*/
/**
 * @param {number[]} nums
 * @return {number}
 */

/* 
  结合最长上升子串的形式， 但是需要考虑的是负数的存在 负负得正
  dp[i]代表的是以i为结尾的乘积
  1. dp[i - 1]为正数 dp[i - 1] * nums[i] 
  2. dp[i - 1]为负数 dp[i - 1] * nums[i]

  但是考虑到当前状态只和上一个状态有关
 */

/* 
  我们把 dp[j−1] 直接拿过来相乘，不一定是局部最优解
如果 j 项是负数，则dp[j−1] 是最大积的话，得到 dp[j] 会是最小的。此时j−1 的最优解应当是负数的最大，即最小积
如果 j 项是正数，把前面的最大积直接拿来乘，没问题
即，对 j 来说j−1 的最优解可能是最大积，也可能是最小乘积
因此，dp[i] 要放两项了，一项是局部最大积，一项是局部最小积
dp[i][0]： 从第 0 项到第 i 项范围内的子数组的最小乘积
dp[i][1]： 从第 0 项到第 i 项范围内的子数组的最大乘积
base case：
dp[0][0] = nums[0]
dp[0][1] = nums[0]
对于以 ii 项为末尾项的子数组能产生的最小积，它有 3 种情况：
不和别人乘，就它自己
自己是负数，希望乘上前面的最大积
自己是正数，希望乘上前面的最小积
所以，dp[i][0]取三种情况中的最小值
dp[i][0]=min(dp[i−1][0]∗nums[i],dp[i−1][1]∗nums[i],nums[i])

类似的，dp[i][1]值取三种情况中的最大值
dp[i][1]=max(dp[i−1][0]∗nums[i],dp[i−1][1]∗nums[i],nums[i])

降维
观察发现， dp[i][x] 只和 dp[i - 1][x] 有关，与再之前的结果无关
我们用两个变量分别去存储每个位置算出的最小积和最大积
base case
prevMin = nums[0]
prevMax = nums[0]
状态转移方程:
prevMin = min( prevMin * nums[i], prevMax * nums[i], nums[i])

prevMax = max( prevMin * nums[i], prevMax * nums[i], nums[i])

等号右边的 prevMin 和 prevMax 属于 dp[i - 1]的。
等号左边的 prevMin 和 prevMax 属于 dp[i]的
错误：第一个等式求出的新 prevMin 用在第二个等式的计算
解决：用变量暂存 prevMin * nums[i]和 prevMax * nums[i]
 */
var maxProduct = (nums) => {
  let res = nums[0]
  let prevMin = nums[0]
  let prevMax = nums[0]
  let temp1 = 0,
    temp2 = 0
  for (let i = 1; i < nums.length; i++) {
    temp1 = prevMin * nums[i]
    temp2 = prevMax * nums[i]
    prevMin = Math.min(temp1, temp2, nums[i])
    prevMax = Math.max(temp1, temp2, nums[i])
    res = Math.max(prevMax, res)
  }
  return res
}

let a = maxProduct([2, 3, -2, 4])

console.log(a)
