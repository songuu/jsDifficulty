/*
 *title数据类型为String
 *userId为主键，数据类型为Number
 */

var data = [
  { userId: 8, title: 'title1' },
  { userId: 11, title: 'other' },
  { userId: 15, title: null },
  { userId: 19, title: 'title2' },
]
const find = function (origin) {
  // your code are here...
  return {
    where: function () {
      const title = arguments[0].title
      let results = []
      for (let i = 0; i < origin.length; i++) {
        if (title.test(origin[i].title)) {
          results.push(origin[i])
        }
      }
      return {
        orderBy: function () {
          return results.sort((a, b) => {
            if (a.userId !== b.userId) {
              return b.userId - a.userId
            } else {
              return b.desc - a.desc
            }
          })
        },
      }
    },
  }
}
// 查找 data 中，符合条件的数据，并进行排序
var result = find(data)
  .where({
    title: /\d$/,
  })
  .orderBy('userId', 'desc')

console.log(result) // [{ userId: 19, title: 'title2'}, { userId: 8, title: 'title1' }];
