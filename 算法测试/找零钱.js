/* 
给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。

 

示例 1:

输入: coins = [1, 2, 5], amount = 11
输出: 3 
解释: 11 = 5 + 5 + 1
示例 2:

输入: coins = [2], amount = 3
输出: -1
*/
/* 
    金额i - 1 和 coins[1](1)组合 
    金额i - 2 和 coins[2](2)组合 
    金额i - 5 和 coins[5](15)组合 
    

    =》 dp[0] = 0
        dp[1] = 1 = 1 + dp[0]
        dp[2] = 1 = 1 + dp[0]
        dp[3] = -1
        dp[4] = -1
        dp[5] = 1 = 1 + dp[0]

        i代表下标
        i = 0,1,2
        coins[i] = 1,2,3
        j代表对应的金额
        j - coins[i] > 0 && dp[j - coins[i]] !== -1
        dp[i] = Math.min(dp[j - coins[i]]) + 1
*/

var coinChange = function (coins, amount) {
    let dp = new Array(amount + 1).fill(amount + 1)

    dp[0] = 0

    for (let j = 1; j <= amount; j++) {
        for (let i = 0; i < coins.length; i++) {
            /* if (j - coins[i] >= 0 && dp[j - coins[i]] !== -1) {
                if (dp[j] == -1 || dp[j] > dp[j - coins[i]] + 1) {
                    dp[j] = dp[j - coins[i]] + 1;
                }
            } */
            if(coins[i] <= j) {
                dp[j] = Math.min(dp[j], dp[j - coins[i]] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount]
    // return dp[amount]
}

let a = coinChange([1, 2, 5], 11)

console.log(a)
