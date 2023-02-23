/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums, target) {
  if (!nums || nums.length < 3) return []
  nums = nums.sort((a, b) => a - b)

  let len = nums.length

  let res = []
  let port = []

  for (let i = 0; i < len; i++) {
    if (nums[i] > target) break

    if (i > 0 && nums[i] === nums[i - 1]) continue

    let left = i + 1
    let right = len - 1

    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right]

      if (sum === target) {
        res.push([nums[i], nums[left], nums[right]])
        port.push([i, left, right])
        while (left < right && nums[left] === nums[left + 1]) left++
        while (left < right && nums[right] === nums[right + 1]) right--
        right--
        left++
      } else if (sum > target) {
        right--
      } else {
        left++
      }
    }
  }

  return {res, port}
}

let nums = [1, 5, 8, 8, 9, 10, 12]

console.log(threeSum(nums, 19))
