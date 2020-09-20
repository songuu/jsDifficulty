/*给定一个无序的整数数组，找到其中最长上升子序列的长度。

示例:

输入: [10,9,2,5,3,7,101,18]
输出: 4
解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
说明:

可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
你算法的时间复杂度应该为 O(n2) 。
进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?
*/

/* 
1.  以i结尾
2.  i代表前i个最长子序列 （省去，无法递推）
*/
/* 
    以i结尾

    第i个状态dp[i]

    dp[i - 1] 代表以第i - 1 个元素结尾的最长上升子序列  （无法上升）
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
    if (nums.length === 0) return 0;
    let dp = new Array(nums.length).fill(0)

    dp[0] = 1; // 默认第一个的长度为1
    for (let i = 1; i < nums.length; i++) {
        // 找到比自己小的数
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    return Math.max(...dp)
};

var lengthOfLIS1 = function (nums) {
    if (nums.length === 0) return 0;
    let dp = new Array(nums.length).fill(0)

    dp[0] = 1; // 默认第一个的长度为1
    let LIS = 0; // 最大的长度
    for (let i = 1; i < nums.length; i++) {
        dp[i] = 0;
        // 找到比自己小的数
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
            }
        }

        if (LIS < dp[i]) {
            LIS = dp[i]
        }
    }

    console.log(dp)
    return LIS;
};

/* 
    二分法实现
*/
var binary_search = function (nums, target) {
    let index = 1;
    let begin = 0;
    let end = nums.length - 1;

    while (index === -1) {
        let mid = (begin + end) / 2;

        if (target === nums[mid]) {
            index = mid;
        } else if (target < nums[mid]) {
            if (mid === 0 || target > nums[mid - 1]) {
                index = mid;
            }
            end = mid - 1;
        } else if (target > nums[mid]) {
            if (mid === nums.length - 1 || target < nums[mid + 1]) {
                index = mid + 1;
            }
            begin = mid + 1;
        }

    }
    return index;
}

var lengthOfLIS2 = function (nums) {
    if (nums.length === 0) return 0;

    let dp = [];

    dp.push(nums[0]);

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > dp.unshift()) {
            dp.push(nums[i])
        } else {
            let pos = binary_search(dp, nums[i]);

            dp[pos] = nums[i]
        }

        console.log(dp)
    }

    return dp.length;
}


let a = lengthOfLIS2([10, 9, 2, 5, 3, 7, 101, 18])

console.log(a)