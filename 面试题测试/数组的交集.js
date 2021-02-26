/**
 * 1.计算多个区间的交集
 *   区间用长度为2的数字数组表示，如[2, 5]表示区间2到5（包括2和5）；
 *   区间不限定方向，如[5, 2]等同于[2, 5]；
 *   实现`getIntersection 函数`
 *   可接收多个区间，并返回所有区间的交集（用区间表示），如空集用null表示
 * 示例：
 *   getIntersection([5, 2], [4, 9], [3, 6]); // [4, 5]
 *   getIntersection([1, 7], [8, 9]); // null
 *
 *   [[1,3], [1,2], [2,3]]
 */

/* 
   两个数组的情况
*/

const intersection1 = function () {
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

function intersection() {
  var result = []
  var lists

  if (arguments.length === 1) {
    lists = arguments[0]
  } else {
    lists = arguments
  }

  for (var i = 0; i < lists.length; i++) {
    var currentList = lists[i]
    for (var y = 0; y < currentList.length; y++) {
      var currentValue = currentList[y]
      if (result.indexOf(currentValue) === -1) {
        var existsInAll = true
        for (var x = 0; x < lists.length; x++) {
          if (lists[x].indexOf(currentValue) === -1) {
            existsInAll = false
            break
          }
        }
        if (existsInAll) {
          result.push(currentValue)
        }
      }
    }
  }
  return result
}

function compareDate() {
  var begin = ['2015-01-02 10:01:38', '2015-01-04 09:28:12']
  var over = ['2015-01-04 10:27:21', '2015-01-09 21:28:13']

  begin = begin.sort()
  over = over.sort()

  for (i = 1; i < begin.length; i++) {
    if (begin[i] <= over[i - 1]) {
      console.log('时间有重复！')
      return false
    }
  }

  console.log('时间没有重复！')
  return true
}

// 时段数组
/* const data = [
  {
    startTime: new Date('2021-02-22 00:00:00'),
    endTime: new Date('2021-02-22 16:30:00'),
    id: 1,
  },
  {
    startTime: new Date('2021-02-22 09:00:00'),
    endTime: new Date('2021-02-22 09:30:00'),
    id: 2,
  },
  {
    startTime: new Date('2021-02-22 10:00:00'),
    endTime: new Date('2021-02-22 16:12:00'),
    id: 3,
  },
  {
    startTime: new Date('2021-02-22 10:12:00'),
    endTime: new Date('2021-02-22 13:12:00'),
    id: 4,
  },
] */

const data = [];
// 对数组循环， 判断数据有效性；将时间转换为时间戳，并给同一时段打上相同标记， 不同时段的标记不同
let tempList = []

data.map((item, index) => {
  // 数据无效直接中断退出
  /* if (!item.startTime || !item.endTime) {
    return false
  } */
  // 转换为时间戳
  let startTimeStamp = item.startTime.getTime(),
    endTimeStamp = item.endTime.getTime()
  if (startTimeStamp >= endTimeStamp) {
    return false
  }
  // 将时段数据处理后存入数组
  tempList.push([
    {
      flag: index,
      value: startTimeStamp,
    },
    {
      flag: index,
      value: endTimeStamp,
    },
  ])
})
// 对数组进行扁平处理后 从小到大排序
let timeFiledList = [].concat(...tempList)

// timeFiledList.sort((a, b) => a.value - b.value)

// 是否重叠标志
let isOverLap = false
for (let i = 0; i < timeFiledList.length; i += 2) {
  if (i > 0) {
    // 存在相同值时(排序中三个连续值) => 时间重叠
    if (
      timeFiledList[i].value == timeFiledList[i - 1].value ||
      timeFiledList[i - 1].value == timeFiledList[i - 2].value
    ) {
      isOverLap = true
      //break
    }
  }
  // 相邻两个标记不同，则为重叠
  if (timeFiledList[i].flag != timeFiledList[i + 1].flag) {
    isOverLap = true
    //break
  }
}

/* let data1 = data.map((item) => {
  return {
    startTime: item.startTime.getTime(),
    endTime: item.endTime.getTime(),
    id: item.id,
  }
}) */

let data1 = [
  { startTime: 1613964600000, endTime: 1613968200000, id: 240 },
  { startTime: 1613978100000, endTime: 1613981700000, id: 241 },
  { startTime: 1613981700000, endTime: 1613985300000, id: 248 },
  { startTime: 1613984400000, endTime: 1613988000000, id: 255 },
  { startTime: 1613984400000, endTime: 1613988000000, id: 256 },
  { startTime: 1613984400000, endTime: 1613988000000, id: 257 },
  { startTime: 1613923200000, endTime: 1614009599000, id: 283 },
  { startTime: 1613923200000, endTime: 1614009599000, id: 284 },
]

/* let arr = [];
for (let i = 0; i < data1.length; i++) {
  let brr = [data1[i]]
  console.log(`第${i + 1}次循环`)
  for (let j = i + 1; j < data1.length; j++) {
    if (
      brr.every(
        (item) =>
          item.startTime <= data1[j].endTime &&
          item.endTime >= data1[j].startTime
      )
    ) {
      brr.push(data1[j])
    } else {
      continue;
    }
  }

  arr.push(brr)
} */
let arr = []
let flag = [] // 记录删除的元素下标
for (let i = 0; i < data1.length; i++) {
  if (flag.length === 0 || !flag.includes(i)) {
    let brr = [data1[i]]
    for (let j = 0; j < data1.length; j++) {
      if (
        i !== j &&
        brr.every(
          (item) =>
            item.startTime <= data1[j].endTime &&
            item.endTime >= data1[j].startTime
        )
      ) {
        flag.push(j)
        brr.push(data1[j])
      } else {
        continue
      }
    }

    brr.sort((a, b) => a.startTime >= b.startTime)
    arr.push(brr)
  }
}

console.log(arr)
arr.sort((a, b) => a.length <= b.length)
console.log(arr)

let widObj = {}

for (let item of arr) {
  for (let item1 of item) {
    if (widObj[item1.id]) {
      /* 
        当前元素存在于以前的元素中间
        直接跳过
      */
    } else {
      /* 
        需要判断数组的重叠部分
      */
      // 当前存在的id的数组
      let ids = item.map((item2) => item2.id + '')
      // 已经存在的key
      let keys = Object.keys(widObj)

      // 已经存在的
      let allLen = 0

      for (let id of ids) {
        if (keys.includes(id)) {
          allLen += widObj[id] - 0
        }
      }
      // 剩下的需要平分的
      let intersection = ids.filter((id) => !keys.includes(id))

      if (intersection.length > 0) {
        widObj[item1.id] = parseFloat(
          (1 - allLen) / intersection.length
        ).toFixed(2)
      }
    }
  }
}

console.log(widObj)

// console.log(arr)
// intersection([1, 6], [4, 9])

// getIntersection([1, 7], [8, 9])
