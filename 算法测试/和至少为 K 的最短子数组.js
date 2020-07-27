/* 
和至少为 K 的最短子数组
返回 A 的最短的非空连续子数组的长度，该子数组的和至少为 K 。

如果没有和至少为 K 的非空子数组，返回 -1 。

 

示例 1：

输入：A = [1], K = 1
输出：1
示例 2：

输入：A = [1,2], K = 4
输出：-1
示例 3：

输入：A = [2,-1,2], K = 3
输出：3
*/

/* 
首先迭加一下，用sum[i+1]代表从A[0]到A[i]的和，然后要求的就是
满足sum[j]-sum[i] >= K的集合([i,j]为这个集合的元素)中 j-i 最小的那个元素

这又又又回到了那个熟悉的问题，排位问题
给每个人排座位，现在到你了，你会想这个座位一定要是递增的，为甚么？
因为如果你前面有一个比你高，再前面有一个比你矮，你肯定拿自己减去矮个的高度看>=K?，而不会拿自己减去前面的那个高个的高度
你会自然的把前面的高个给删去，为甚么可以，因为你更矮~~，你后面的人如果比较，也会跟你比较(j-i小/位子更近)
所以还是变成递增数组/栈/队列

这里特殊的是当排到我们了，我们先确定我们前面没有高个，高个的话就踢了，然后拿自己与第一位的人去比较，因为他最矮，然后再跟第二位...
所以这里才使用了双端队列，因为排到我们时，我们要从后面剔除高个，再从前面第一位开始进行比较。
*/

function solution(A = [], K = 0) {
  let len = A.length

  let sum = new Array(len + 1).fill(0)

  for (let i = 0; i < len; i++) {
    sum[i + 1] = sum[i] + A[i]
  }

  let popArr = []

  let j = 0

  let res = len + 1

  console.log(`当前的sum的结果为${sum}`)
  while (j <= len) {
    console.log(`这是第${j}次执行!`)
    while (popArr.length !== 0 && sum[j] <= sum[popArr[popArr.length - 1]]) {
      // 剔除前面比当前元素大的那个元素
      popArr.pop()
    }
    while (popArr.length !== 0 && sum[j] - sum[popArr[0]] >= K) {
      // 从头开始比较看是否更小的元素
      res = Math.min(res, j - popArr[0])
      popArr.shift()
    }

    popArr.push(j)
    j++
  }

  console.log(`============>\n最后的sum组合为${popArr}`)

  if (res === len + 1) {
    return -1
  } else {
    return res
  }
}

let a = solution([2, -1, 2], 3)

console.log(a)
