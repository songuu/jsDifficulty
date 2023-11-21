/* 
  计算两个数组的交集
  [1,2,3,3]和[3,3] => [3,3]
*/

// es直接filter
var intersection = function (nums1, nums2) {
  let tmp = {}
  return nums1.filter((item) => {
    if (!tmp[item] && nums2.includes(item)) {
      tmp[item] = true
      return nums2.includes(item)
    }
  })
}

// 双指针
var intersection1 = function (nums1, nums2) {
  nums1 = nums1.sort((a, b) => a - b)
  nums2 = nums2.sort((a, b) => a - b)
  let i = 0
  let j = 0
  let res = new Set()
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      i++
    } else if (nums1[i] > nums2[j]) {
      j++
    } else {
      res.add(nums1[i])
      i++
      j++
    }
  }
  return [...res]
}

var intersection2 = function (nums1, nums2) {
  nums1 = nums1.sort()
  nums2 = nums2.sort()
  let i = 0
  let j = 0

  let res = []
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      i++
    } else if (nums1[i] > nums2[j]) {
      j++
    } else {
      res.push(nums1[i])
      i++
      j++
    }
  }
  return res
}

console.log(intersection2([1, 2, 3, 3], [1, 2]))
