/*
 * @Author: songyu
 * @Date: 2021-07-06 11:05:37
 * @LastEditTime: 2021-07-06 13:18:27
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\jsDifficulty\算法测试\十大排序算法\直接插入.js
 */
function insert(arr) {
  let len = arr.length;

  if (len < 1) return arr;

  for (let i = 1; i < len; i++) {
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) {
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      }
    }
  }

  return arr;
}

function insert1(arr) {
  for (let i = 1; i < arr.length; i++) {
    let j = i;
    let target = arr[j];
    while (j > 0 && arr[j - 1] > target) {
      arr[j] = arr[j - 1];
      j--;
    }
    arr[j] = target;
  }
  return arr;
}

const arr = [7, 8, 4, 5, 6, 3, 2, 1];
console.log(insert(arr));
