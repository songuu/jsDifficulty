/*
 * @Author: songyu
 * @Date: 2021-02-02 16:40:14
 * @LastEditor: songyu
 * @LastEditTime: 2021-05-24 17:44:33
 */
Object.entries(
  [...document.querySelectorAll('*')]
    .map((v) => v.tagName)
    .reduce((res, a) => {
      res[a] = (res[a] || 0) + 1
      return res
    }, {})
)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 3)

// * 获取所有的文本内容
document
  .querySelectorAll('*')
  .filter((item) => item.firstChild)
  .map((item) => item.firstChild.nodeValue)
