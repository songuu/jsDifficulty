/*
 * @Author: songyu
 * @Date: 2021-07-06 11:02:33
 * @LastEditTime: 2021-07-06 11:05:21
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\jsDifficulty\算法测试\十大排序算法\冒泡.js
 */
function bubble(arr) {
  let len = arr.length;

  if (len < 1) return arr;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }

  return arr;
}

const arr = [7, 8, 4, 5, 6, 3, 2, 1];
console.log(bubble(arr))