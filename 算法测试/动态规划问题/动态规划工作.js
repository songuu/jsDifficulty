/* 
  你打算利用空闲时间来做兼职工作赚些零花钱。
  这里有 n 份兼职工作，每份工作预计从 startTime[i] 开始到 endTime[i] 结束，报酬为 profit[i]。
  给你一份兼职工作表，包含开始时间 startTime，结束时间 endTime 和预计报酬 profit 三个数组，请你计算并返回可以获得的最大报酬。
  注意，时间上出现重叠的 2 份工作不能同时进行。
  如果你选择的工作在时间 X 结束，那么你可以立刻进行在时间 X 开始的下一份工作。
*/

/* 
  直接强调的是opt(i) 和 prev(i)
  计算实现：
    首先按照结束时间进行排序
    opt(i) = 1. v(i) + opt(prev(i))
             2. opt(i - 1)
    比较他们之间的最大值
    最大值及为最优解
    例子1:
    [1, 2, 3, 3],[3, 4, 5, 6],[50, 10, 40, 70]
    =》 [ [ 1, 3, 50 ], [ 2, 4, 10 ], [ 3, 5, 40 ], [ 3, 6, 70 ] ]
    i = 1 , prev(i) = 0, opt(1) = 50
    i = 2 , prev(2) = 0, opt(2) = 50
    i = 3 , prev(4) = 50 = opt(1), opt(3) = 50 + 70 = 120

    例子2：
    [1,3,0,4,3,5,6,8], [4,3,6,4,8,9,10,11], [5,1,8,4,6,3,2,4]
    =》[
      [ 1, 4, 5 ],   1
      [ 3, 5, 1 ],   2
      [ 0, 6, 8 ],   3
      [ 4, 7, 4 ],   4
      [ 3, 8, 6 ],   5
      [ 5, 9, 3 ],   6
      [ 6, 10, 2 ],  7
      [ 8, 11, 4 ]   8
    ]
    i = 1, pre(1) = 0, opt(1) = 5 = v(1) [1]
    i = 2, pre(2) = 0, (opt(2) = 1) 小于 (opts(1) = 5) [1]
    i = 3, pre(3) = 0, opt(3) = 8 = v(3) [3]
    i = 4, pre(4) = opt(1) = 5, opt(4) = (4 = v(4)) + 5 = 9 [1,4] 
    i = 5, pre(5) = 0, opt(5) = 6 小于 opts(4), opts(5) = 9 [1,4]
    i = 6, pre(6) = opt(2), ((opt(6) = 3) + opts(2)) = 4 < opts(5) = 9 [1,4]  
    i = 7, pre(7) = opt(3), opt(6) = 8 + 2 = 10 [7]
    i = 8, pre(8) = pre(5), opts(5) + 4 = 13 > opts(7) = 10 [1,4,8]

    => 13
*/


// 找出之前的最大的收益值
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
    console.log(jobs[i])
    const prev = search(dp, jobs[i][0])[1] // 工作[i]startTime前的最大收益
    console.log(`这是第${i + 1}次运行，之前的最大收益是${prev}`);
    //    现在最大收益            过去最大收益
    if (prev + jobs[i][2] > dp[dp.length - 1][1]) {
      dp.push([jobs[i][1], prev + jobs[i][2]])
    }
    console.log(`这是第${i + 1}次运行，当前的最大收益是${dp[dp.length - 1][1]}`);
  }
  
  console.log(dp)
  return dp[dp.length - 1][1]
}

var jobScheduling1 = function (startTime, endTime, profit) {
  // 构造新数组
  const jobs = [];
  for (let i = 0; i < startTime.length; i += 1) {
    jobs.push([startTime[i], endTime[i], profit[i]]);
  }
  jobs.sort(([s1], [s2]) => s1 - s2);// 按照startTime排序
  console.log(jobs)

  // 动态规划
  const dp = [];// 按顺序记录包含jobs[i]的最大收益
  let res = 0;// 记录最大收益
  let pos = 0;// 还没延续到下一个工作的最小位置
  let temp = 0;// jobs[i]startTime之前的最大收益
  for (let i = 0; i < jobs.length; i += 1) {
    for (let j = pos; j < i; j += 1) {
      if (jobs[i][0] >= jobs[j][1]) {
        // 如果出现j不等于pos的情况，j必然大于pos，
        // 说明此前有一个工作没延续过，pos停止移动
        if (j === pos) { pos += 1; }
        temp = Math.max(temp, dp[j]);

        console.log(`当前最大的收益为${temp}`)
      }
    }
    dp.push(temp + jobs[i][2]);// 记录包含jobs[i]的最大收益
    console.log(`当前的dp数组为`)
    console.log(dp)
    res = Math.max(dp[i], res);
    console.log(`当前的最大值为${res}`)
    console.log(`=====================>第${i+1}次循环结束`);
  }
  return res;
}

// let a = jobScheduling([1, 2, 3, 3],[3, 4, 5, 6],[50, 10, 40, 70])
let b = jobScheduling([1, 3, 0, 4, 3, 5, 6, 8], [4, 5, 6, 7, 8, 9, 10, 11], [5, 1, 8, 4, 6, 3, 2, 4])
