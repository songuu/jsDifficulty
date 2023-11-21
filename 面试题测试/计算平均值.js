/* 
开门谜题（邮件发送在线IDE调试链接，或源码也可）
对一群学生的所有数值属性（整形或浮点）求均值。要求：
1.	属性dict/object嵌套层级N层（不限于例子3层）。
2.	结果数据四舍五入，保留2位小数。

输入：
testListWithNestedDicts = [
    {
        "studentId": 1,
        "age": 7,
        "height": 2,
        "weight": 3,
        "scores": {
            "spanish": 80,
            "mathematics": 90,
            "english": 100,
            "pe": {
                "run": 85,
                "jump": 95
            }
        }
    },
    {
        "studentId": 2,
        "age": 8,
        "height": 4,
        "weight": 6,
        "scores": {
            "spanish": 90,
            "mathematics": 90,
            "english": 80,
            "pe": {
                "run": 90,
                "jump": 90
            }
        }
    },
    {
        "studentId": 3,
        "age": 7,
        "height": 3,
        "weight": 6,
        "scores": {
            "spanish": 86,
            "mathematics": 90,
            "english": 75,
            "pe": {
                "run": 65,
                "jump": 90
            }
        }
    }
]

输出：
{
    "age": 7.33,
    "height": 3.0,
    "weight": 5.0,
    "scores": {
        "spanish": 85.33,
        "mathematics": 90.0,
        "english": 85.0,
        "pe": {
            "run": 80.0,
            "jump": 91.67
        }
    }
}
*/

/* 
1.	属性dict/object嵌套层级N层（不限于例子3层）。
2.	结果数据四舍五入，保留2位小数。
*/
const getAverage = (testListWithNestedDicts) => {
  const result = {}
  const len = testListWithNestedDicts.length
  const keys = Object.keys(testListWithNestedDicts[0])
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (typeof testListWithNestedDicts[0][key] === 'number') {
      result[key] =
        (
          testListWithNestedDicts.reduce((sum, item) => sum + item[key], 0) /
          len
        ).toFixed(2) * 1
    } else {
      result[key] = getAverage(testListWithNestedDicts.map((item) => item[key]))
    }
  }
  return result
}

const testListWithNestedDicts = [
  {
    studentId: 1,
    age: 7,
    height: 2,
    weight: 3,
    scores: {
      spanish: 80,
      mathematics: 90,
      english: 100,
      pe: {
        run: 85,
        jump: 95,
      },
    },
  },
  {
    studentId: 2,
    age: 8,
    height: 4,
    weight: 6,
    scores: {
      spanish: 90,
      mathematics: 90,
      english: 80,
      pe: {
        run: 90,
        jump: 90,
      },
    },
  },
  {
    studentId: 3,
    age: 7,
    height: 3,
    weight: 6,
    scores: {
      spanish: 86,
      mathematics: 90,
      english: 75,
      pe: {
        run: 65,
        jump: 90,
      },
    },
  },
]

console.log(getAverage(testListWithNestedDicts))
