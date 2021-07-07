/*
 * @Author: songyu
 * @Date: 2021-07-06 11:16:45
 * @LastEditTime: 2021-07-06 11:18:19
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\jsDifficulty\算法测试\十大排序算法\选择排序.js
 */
const selectionSort = (arr) => {
  const len = arr.length;
  let minIndex, temp;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        // 寻找最小的数
        minIndex = j; // 将最小数的索引保存
      }
    }

    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
};
