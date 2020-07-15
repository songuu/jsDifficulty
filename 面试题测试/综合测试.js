/*
 * 获取数组的公共元素
 */
const intersection = (list, ...args) =>
  list.filter((item) => args.every((list) => list.includes(item)))

console.log(intersection([2, 1], [2, 3])) // [2]

/*
 * 获取元素类型
 */

const dataType = (obj) =>
  Object.prototype.toString
    .call(obj)
    .replace(/^\[object (.+)\]$/, '$1')
    .toLowerCase()

/*
 * 输入框只能输入中文
 */

const input = document.querySelector('input[type="text"]')
const clearText = (target) => {
  const { value } = target
  target.value = value.replace(/[^\u4e00-\u9fa5]/g, '')
}
input.onfocus = ({ target }) => {
  clearText(target)
}
input.onkeyup = ({ target }) => {
  clearText(target)
}
input.onblur = ({ target }) => {
  clearText(target)
}
input.oninput = ({ target }) => {
  clearText(target)
}

/*
 * 将键值对的key按照传入的函数进行转换
 */
const deepMapKeys = (obj, fn) =>
  Array.isArray(obj)
    ? obj.map((val) => deepMapKeys(val, fn))
    : typeof obj === 'object'
    ? Object.keys(obj).reduce((acc, current) => {
        const key = fn(current)
        const val = obj[current]
        acc[key] =
          val !== null && typeof val === 'object' ? deepMapKeys(val, fn) : val
        return acc
      }, {})
    : obj

const obj = {
  foo: '1',
  nested: {
    child: {
      withArray: [
        {
          grandChild: ['hello'],
        },
      ],
    },
  },
}

const upperKeysObj = deepMapKeys(obj, (key) => key.toUpperCase())
