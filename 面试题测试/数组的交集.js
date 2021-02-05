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

/* 
   两个数组的情况
*/

const intersection = function () {
  var result = []
  var lists

  if (arguments.length === 1) {
    lists = arguments[0]
  } else {
    lists = arguments
  }

  let [a, b] = [...lists]

  // return a.filter((v, i) => b.includes(v) && a.lastIndexOf(v) === i)
}

/* 
    多个数组的情况
*/
const getIntersection = function () {
  var result = {}
  var lists

  if (arguments.length === 1) {
    lists = arguments[0]
  } else {
    lists = arguments
  }

  lists = [...lists]

  for (let i = 0; i < lists.length; i++) {
    let min = Math.min(lists[i][0], lists[i][1])
    let max = Math.max(lists[i][0], lists[i][1])
    for (let j = min; j <= max; j++) {
      if (result[j] >= 0) {
        result[j]++
      } else {
        result[j] = 0
      }

      // result[j]=(result[j] || 0)+1 
    }
  }

  let keys = Object.keys(result)
  keys = keys.filter((key) => result[key] == 2).map((key) => key - 0)

  console.log(keys)
}

/* function intersection() {
    var result = [];
    var lists;

    if (arguments.length === 1) {
        lists = arguments[0];
    } else {
        lists = arguments;
    }

    for (var i = 0; i < lists.length; i++) {
        var currentList = lists[i];
        for (var y = 0; y < currentList.length; y++) {
            var currentValue = currentList[y];
            if (result.indexOf(currentValue) === -1) {
                var existsInAll = true;
                for (var x = 0; x < lists.length; x++) {
                    if (lists[x].indexOf(currentValue) === -1) {
                        existsInAll = false;
                        break;
                    }
                }
                if (existsInAll) {
                    result.push(currentValue);
                }
            }
        }
    }
    return result;
} */

intersection([1, 6], [4, 9])
getIntersection([1, 7], [8, 9])
