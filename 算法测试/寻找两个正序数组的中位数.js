/* 
  给定两个大小为 m 和 n 的正序（从小到大）数组 nums1 和 nums2。
  请你找出这两个正序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
  你可以假设 nums1 和 nums2 不会同时为空。
  示例 1:
  nums1 = [1, 3]
  nums2 = [2]
  则中位数是 2.0
  示例 2:
  nums1 = [1, 2]
  nums2 = [3, 4]
  则中位数是 (2 + 3)/2 = 2.5
*/

// 解法1，直接破解
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
/* 
  长度大的为nums1，长度小的为nums2
  nums1 = [1,2,3]
  nums2 = [4,5]
*/
var findMedianSortedArrays = function (nums1, nums2) {
  for (var j = 0; j < nums1.length; j++) {
    if (nums2[0] < nums1[j]) {
      nums1.splice(j, 0, nums2[0]) //将nums2 中的元素插入nums1；
      nums2.shift() //将刚插入元素删除；
    }
    if (nums2.length == 0) {
      break //当nums2中没有元素时跳出循环，以免浪费时间；
    }
  }
  if (j == nums1.length) {
    nums1 = nums1.concat(nums2)
  }
  if (nums1.length % 2 == 0) {
    return (
      (nums1[parseInt((nums1.length - 1) / 2)] +
        nums1[parseInt((nums1.length - 1) / 2) + 1]) /
      2
    )
  } else {
    return nums1[(nums1.length - 1) / 2]
  }
}

// 解法2：二分法
/* 
  长度小的为nums1, 长度大的为nums2
*/
var findMedianSortedArrays1 = function (nums1, nums2) {
  // 长度小的为nums1 长度大的为nums2
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1]
  }
  const m = nums1.length
  const n = nums2.length
  let low = 0
  let high = m
  while (low <= high) {
    const i = low + Math.floor((high - low) / 2)
    const j = Math.floor((m + n + 1) / 2) - i

    const maxLeftA = i === 0 ? -Infinity : nums1[i - 1] // nums1中间值左侧
    const minRightA = i === m ? Infinity : nums1[i] // nums1中间值右侧
    const maxLeftB = j === 0 ? -Infinity : nums2[j - 1] // nums2中间值左侧
    const minRightB = j === n ? Infinity : nums2[j] // nums2中间值右侧

    if (maxLeftA <= minRightB && minRightA >= maxLeftB) {
      return (m + n) % 2 === 1
        ? Math.max(maxLeftA, maxLeftB)
        : (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2
    } else if (maxLeftA > minRightB) {
      high = i - 1
    } else {
      low = low + 1
    }
  }
}
let a = findMedianSortedArrays1([4, 5], [1, 2, 3])
console.log(a)
