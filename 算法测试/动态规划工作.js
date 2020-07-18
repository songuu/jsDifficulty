/* 
  你打算利用空闲时间来做兼职工作赚些零花钱。
  这里有 n 份兼职工作，每份工作预计从 startTime[i] 开始到 endTime[i] 结束，报酬为 profit[i]。
  给你一份兼职工作表，包含开始时间 startTime，结束时间 endTime 和预计报酬 profit 三个数组，请你计算并返回可以获得的最大报酬。
  注意，时间上出现重叠的 2 份工作不能同时进行。
  如果你选择的工作在时间 X 结束，那么你可以立刻进行在时间 X 开始的下一份工作。
*/

// 返回的是最适合的[endTime, profit]
function search(dp, s) {
  // 二分查找
  if (dp.length === 1) {
    return dp[0]
  }

  let m = Math.floor(dp.length / 2)

  if (dp[m][0] > s) {
    return search(dp.slice(0, m), s)
  } else {
    return search(dp.slice(m), s)
  }
}

var jobScheduling = function (startTime, endTime, profit) {
  // 构造新数组
  const jobs = []
  for (let i = 0; i < startTime.length; i += 1) {
    jobs.push([startTime[i], endTime[i], profit[i]])
  }
  jobs.sort(([s1, e1], [s2, e2]) => e1 - e2) // 按照endTime排序

  console.log(jobs)

  // 动态规划
  const dp = [[0, 0]] // 记录每个状态下的最大收益 [endTime, profit]
  for (let i = 0; i < jobs.length; i += 1) {
    const prev = search(dp, jobs[i][0])[1] // 工作[i]startTime前的最大收益
    console.log(`这是第${i}次运行，之前的最大收益是${prev}`);
    //    现在最大收益            过去最大收益
    if (prev + jobs[i][2] > dp[dp.length - 1][1]) {
      dp.push([jobs[i][1], prev + jobs[i][2]])
    }
    console.log(`这是第${i}次运行，当前的最大收益是${dp[dp.length - 1][1]}`);
  }
  return dp[dp.length - 1][1]
}

let a = jobScheduling([1, 2, 3, 3],[3, 4, 5, 6],[50, 10, 40, 70])
