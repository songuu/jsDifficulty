/*
    给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。

相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。



例如，给定三角形：

[
     [2],
    [3,4],
   [6,5,7],
  [4,1,8,3]
]
自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）

[[2],[3,4],[6,5,7],[4,1,8,3]]
*/

/**
 * @param {number[][]} triangle
 * @return {number}
 */

// 从下往上
/* 
    dp[i][j] 代表的是i行j列代表的数
*/
var minimumTotal = function (triangle) {
  if (triangle.length === 0) {
    return 0
  }

  let dp = []

  for (let i = 0; i < triangle.length; i++) {
    dp[i] = new Array(triangle[i].length).fill(0)
  }

  /* 
        dp的每个位置都是“和”
        从下往上 最后一行就是传入数组的最后一行  最后一行不被影响
    */
  for (let i = 0; i < dp.length; i++) {
    dp[dp.length - 1][i] = triangle[dp.length - 1][i]
  }

  for (let i = dp.length - 2; i >= 0; i--) {
    for (let j = 0; j < dp[i].length; j++) {
      dp[i][j] = Math.min(dp[i + 1][j], dp[i + 1][j + 1]) + triangle[i][j]
    }
  }

  return dp[0][0]
}

// 意思就是下一行与上一行的结果无关
var minimumTotal1 = function (triangle) {
  var dp = new Array(triangle.length + 1).fill(0)

  for (var i = triangle.length - 1; i >= 0; i--) {
    for (var j = 0; j < triangle[i].length; j++) {
      dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j]
    }
  }
  return dp[0]
}

let a = minimumTotal1([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]])
console.log(a)
