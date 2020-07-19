/*
  给定一个整数数组 nums ，小李想将 nums 切割成若干个非空子数组，使得每个子数组最左边的数和最右边的数的最大公约数大于 1 。为了减少他的工作量，请求出最少可以切成多少个子数组。
*/
/* function solvePrime(nums) {
  var primeArray = new Array(nums.length).fill(false);
  var array = [];
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] === 0 || nums[i] === 1) {
      primeArray[i] = false;
    } else {
      //每次循环都从2开始判断这个数能否被整除:
      var b = 2
      //若a不能被b整除,则可能是质数:
      while (nums[i] % b != 0) {
        b++
      }
      if (nums[i] == b) {
        array.push(nums[i])
        primeArray[i] = true;
      }
    }
  }
  return array;
}

function splitArray(nums) {
  if (nums.length === 0) {
    return 0;
  }

  let primeArray = solvePrime(nums); // 计算所有的素数相关的数

  let len = nums.length;

  let dp = new Array(len); // 最小划分

  let pflag = new Array(len);

  let has = [];

  dp[0] = 0;

  for (let i = 0; i < len; i++) {
    let x = nums[i]; // 当前值

    for (let j = 0; j < primeArray.length; j++) {
      let p = primeArray[j]; // 当前的素数

      if (x < p) break; // 如果比当前素数还小，就直接退出循环

      // 如果包含当前素数
      if (x % p === 0) {
        has.push(p);
        while (x % p === 0) x /= p;
      }
    }

    if (x !== 1) has.push(x);

    // 更新素数空间
    for(let j = 0; j < has.length;j++) {
      let p = has[j];
      pflag[p] = Math.min(pflag[p], dp[i]);
    }

    for(let j = 0;j < has.length;j++) {
      let p = has[j];
      dp[i] = Math.min(dp[i], pflag[p] + 1)
    }
  }
  return dp[len - 1]
}

splitArray([1, 5, 6, 8, 9, 2]) */

/*
  给定一个整数数组 nums ，小李想将 nums 切割成若干个非空子数组，使得每个子数组最左边的数和最右边的数的最大公约数大于 1 。为了减少他的工作量，请求出最少可以切成多少个子数组。
*/

/* 
  解题思路
  那么我们换个思路想一想，我们能否通过质数的一个递推关系来找到我们要的答案呢？
  因为我们知道在上面的递推过程中其实我们也只是要找到所有和num[i]有共同的质数的num[j]，
  那么我们可以定义一个pflag[p]来维护这个递推，pflag[p]的意思就是假如当前j位置的质因子为p，
  这个质因子p和下一个数字也组成一次划分的前，最小的划分数前是多少
  那肯定就是pflag[p]=min(dp[j-1])，其中num[j]的质因子包含了p
  那么我们暴力的递推就不需要这么弄了，我们每次只要找到质因子p，求出dp[i]=min(pflag[p]+1)，
  这就代表了和上一个质数的位置jj组成[j,i]为1段，[0,...,j-1]自己再划分最小的划分数了
  那么维护就很好维护了，每次计算dp[i]前，先求出这个变量的所有质因子p，然后通过pflag[p]=min(pflag[p],dp[i-1])
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
const PN = 10 ** 6 + 1
const PNSqrt = Math.sqrt(PN)
var splitArray = function(nums) {
    if((nums === null) || (nums.length === 0)) return 0
    const prime = [] // 获取所有的质数
    const isPrime = new Array(PN).fill(true) // 首先设置所有的数都是质数
    for(let i = 2; i <= PNSqrt; i++) {
        if(!isPrime[i]) continue
        prime.push(i)
        for(let j = i; j < PN; j += i) isPrime[j] = false 
    }
    const n = nums.length
    const dp = new Array(n + 1).fill(n)
    const has = [] // 找出可以被当前数整除的所有的质数
    const pFlag = new Array(PN).fill(n)
    dp[0] = 0
    for(let i = 1; i <= n; i++) {
        let x = nums[i - 1]
        console.log(`这是第${i}次执行`)
        console.log(`执行之前X的值为${x}`)
        has.length = 0
        for(let j = 0; j < prime.length; j++) {
            const p = prime[j]
            if(x < p) break; // 如果比当前素数还小，就直接退出循环
            if((x % p) === 0) {
                has.push(p)
                while((x % p) === 0) x /= p // 去除所有的素数(可被素数除尽的数)
            }
        }
        console.log(`执行之后X的值为${x}`)
        if(x !== 1) has.push(x)
        /**
         * 基本递推公式: 一个数都没遍历的时候， dp[0] = 0
         * 每遍历一个数x = nums[i], x要么跟[0, i -1]范围内的某个数组成一组, 要么
         * 自己单独一组, 具体怎么选择, 看怎么选择结果最小。
         * pFlag[p]记录的是在[0, i - 1]中， 我i遍历到i - 1为止,我前面的nums[i]有出现过质因数p, 我选择某一个位置t与i组成一组的情况下， dp[t - 1]的最小值。
         * 这里一个数的某个质因数如果是前面多个数的质因数, 那么应该选择使得结果最小的那个位置 
         * 
         */
        console.log(has)
        for(let j = 0; j < has.length; j++) {
            const p = has[j]
            console.log(`当前执行的pFlag[p]的值为${pFlag[p]}，dp[i - 1]的值为${dp[i - 1]}`)
            pFlag[p] = Math.min(pFlag[p], dp[i - 1])
            console.log(`当前执行的dp[i]为${dp[i]}`)
            dp[i] = Math.min(dp[i], pFlag[p] + 1)
        }
        console.log("========================>")
    }
    return dp[n]
};

let a = splitArray([6,4,3,2,5,3])

console.log(`最后的结果是${a}`)