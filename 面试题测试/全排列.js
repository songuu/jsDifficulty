/* 
给定一个 没有重复 数字的序列，返回其所有可能的全排列。

示例:

输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = (nums) => {
  // 1. 设置结果集
  const result = [];

  // 2. 回溯
  const recursion = (path, set) => {
    // 2.1 设置回溯终止条件
    if (path.length === nums.length) {

      // 2.1.1 推入结果集
      result.push(path.concat());

      // 2.1.2 终止递归
      return;
    }

    // 2.2 遍历数组
    for (let i = 0; i < nums.length; i++) {

      // 2.2.1 必须是不存在 set 中的坐标
      if (!set.has(i)) {

        // 2.2.2 本地递归条件（用完记得删除）
        path.push(nums[i]);
        set.add(i);

        // 2.2.3 进一步递归
        recursion(path, set);

        // 2.2.4 回溯：撤回 2.2.2 的操作
        path.pop();
        set.delete(i);
      }
    }
  };
  recursion([], new Set());

  // 3. 返回结果
  return result;
};

/* 
* 主要是将数组每一个元素都放在第一个位置进行排列
* 回溯法
*/

function permute1(nums) {
  let res = []
  perm(nums, 0, nums.length - 1, res)
  return res
}

// p 全排列的开始位置 q 全排列的结束位置
function perm(arr, p, q, res) {
  if (p === q) {
    console.log('当前已全部排列完', arr)
    res.push([...arr])
  } else {
    for (let i = p; i <= q; i++) {
      swap(arr, i, p)
      perm(arr, p + 1, q, res)
      swap(arr, i, p) // 这里再次交换是为了保证 arr 的相对一致
    }
  }
}

// 位置交换
function swap(arr, p, q) {
  [arr[p], arr[q]] = [arr[q], arr[p]]
}

console.log(permute1([1, 2, 3, 4, 5]));