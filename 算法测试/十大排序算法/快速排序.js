/*
 * @Author: songyu
 * @Date: 2021-07-06 11:18:39
 * @LastEditTime: 2021-07-06 13:20:13
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\jsDifficulty\算法测试\十大排序算法\快速排序.js
 */
function quickSort(arr) {
  // 4.结束递归（当ary小于等于一项，则不用处理）
  if (arr.length <= 1) {
    return arr;
  }
  // 1. 找到数组的中间项，在原有的数组中把它移除
  const middleIndex = (arr.length / 2) >> 1;
  const middle = arr.splice(middleIndex, 1)[0];
  // 2. 准备左右两个数组，循环剩下数组中的每一项，比当前项小的放到左边数组中，反之放到右边数组中
  const leftArr = [],
    rightArr = [];
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    current < middle ? leftArr.push(current) : rightArr.push(current);
  }
  // 3. 递归方式让左右两边的数组持续这样处理，一直到左右两边都排好序为止。
  return quickSort(leftArr).concat(middle, quickSort(rightArr));
}

function quickSort1(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const cur = arr[arr.length - 1];
  const left = arr.filter((v, i) => v <= cur && i !== arr.length - 1);
  const right = arr.filter((v) => v > cur);
  return [...quickSort(left), cur, ...quickSort(right)];
}
const arr = [7, 8, 4, 5, 6, 3, 2, 1];
console.log(quickSort(arr));
