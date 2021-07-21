/*
 * @Author: songyu
 * @Date: 2021-07-08 20:35:15
 * @LastEditTime: 2021-07-08 22:57:23
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\jsDifficulty\手写\计算多个区间的交集.js
 */
/**
 * 1.计算多个区间的交集
 *   区间用长度为2的数字数组表示，如[2, 5]表示区间2到5（包括2和5）；
 *   区间不限定方向，如[5, 2]等同于[2, 5]；
 *   实现`getIntersection 函数`
 *   可接收多个区间，并返回所有区间的交集（用区间表示），如空集用null表示
 * 示例：
 *   getIntersection([5, 2], [4, 9], [3, 6]); // [4, 5]
 *   getIntersection([1, 7], [8, 9]); // null
 */
function getIntersection() {
  let arrs = [...arguments];

  if (!arrs.length) return [];

  arrs = arrs.map((arr) => arr.sort());

  let len = arrs.length;

  let hash = arrs[0];
  for (let i = 0; i < len; i++) {
    if (arrs[i][0] <= hash[1]) {
      let left = Math.max(hash[0], arrs[i][0]);
      let right = Math.min(hash[1], arrs[i][1]);

      hash = [left, right];
    }
  }

  return hash;
  //   return hash[0] === hash[1] &&  ? null : hash;
}

const getIntersection1 = function () {
  var result = {};
  var lists;

  if (arguments.length === 1) {
    lists = arguments[0];
  } else {
    lists = arguments;
  }

  lists = [...lists];

  for (let i = 0; i < lists.length; i++) {
    let min = Math.min(lists[i][0], lists[i][1]);
    let max = Math.max(lists[i][0], lists[i][1]);
    for (let j = min; j <= max; j++) {
      if (result[j] >= 0) {
        result[j]++;
      } else {
        result[j] = 0;
      }

      // result[j]=(result[j] || 0)+1
    }
  }

  let keys = Object.keys(result);
  keys = keys.filter((key) => result[key] == 2).map((key) => key - 0);

  console.log(keys.length ? keys : null);
};

let res = getIntersection1([-1, 0], [0, 9]);

// console.log(res);
