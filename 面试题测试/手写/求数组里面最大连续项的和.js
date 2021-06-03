/*
 * @Author: songyu
 * @Date: 2021-06-03 11:30:23
 * @LastEditor: songyu
 * @LastEditTime: 2021-06-03 11:38:26
 */
// * 使用动态规划 后一项数据 与 后一项数据与前一项数据的最大值 取其中的最大值
function getMaxSum(arr) {
  if (!arr.length) return 0

  let dp = new Array(arr.length).fill(0)

  dp[0] = arr[0]

  for (let i = 1; i < arr.length; i++) {
    dp[i] = Math.max(arr[i], dp[i - 1] + arr[i]);
  }

  return Math.max(...dp)
}

console.log(getMaxSum([1, -2, 3, 4, -1, 5]));
