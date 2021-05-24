/*
 * @Author: songyu
 * @Date: 2021-05-23 17:49:48
 * @LastEditTime: 2021-05-23 18:12:06
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\面试题测试\18四数之和.js
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function (nums, target) {
    if (!nums || nums.length < 4) return [];

    nums = nums.sort((a, b) => a - b);

    let len = nums.length;

    let res = [];


    for (let i = 0; i < len - 3; i++) {
        if (i > 0 && nums[i] === nums[i - 1]) continue; // * 相邻的元素不能相等

        if ((nums[i] + nums[i + 1] + nums[i + 2] + nums[i + 3]) > target) break;
        if ((nums[i] + nums[len - 1] + nums[len - 2] + nums[len - 3]) < target) continue;

        for (let j = i + 1; j < len - 2; j++) {
            if (j - i > 1 && nums[j] === nums[j - 1]) continue; // * 相邻的元素不能相等

            if ((nums[i] + nums[j] + nums[j + 1] + nums[j + 2]) > target) break;
            if ((nums[i] + nums[j] + nums[len - 1] + nums[len - 2]) < target) continue;

            let left = j + 1;
            let right = len - 1;

            while (left < right) {
                let sum = nums[i] + nums[j] + nums[left] + nums[right]
                if (sum === target) {
                    res.push([nums[i], nums[j], nums[left], nums[right]]);
                    while (left < right && nums[left] === nums[left + 1]) left++;
                    while (left < right && nums[right] === nums[right + 1]) right--;
                    right--;
                    left++;
                } else if (sum > target) {
                    right--;
                } else {
                    left++
                }
            }
        }
    }

    return res;
};

let nums = [1, 0, -1, 0, -2, 2]

console.log(fourSum(nums, 0));