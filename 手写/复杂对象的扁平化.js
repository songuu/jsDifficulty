const obj1 = {
  a: {
    b: 1,
    c: 2,
    d: {
      e: 5,
    },
  },
  b: [
    1,
    3,
    {
      a: 2,
      b: 3,
    },
  ],
  c: 3,
}

let b = Object.prototype.toString.call(undefined)
console.log(b)

const isObj = (obj) => {
  return typeof obj === 'object' && obj !== null
}

const flatten = (obj) => {
  if (!isObj(obj)) {
    return
  }

  let res = {}

  const flat = (objs, prefix = '') => {
    if (isObj(objs)) {
      if (Array.isArray(objs)) {
        objs.forEach((item, index) => {
          flat(item, `${prefix}[${index}]`)
        })
      } else {
        for (let j in objs) {
          flat(objs[j], `${prefix}${prefix ? '.' : ''}${j}`)
        }
      }
    } else {
      res[prefix] = objs
    }
  }

  flat(obj)
  return res
}

let flatten1 = (obj) => {
  let result = {}

  let process = (key, value) => {
    if (Object(value) !== value) {
      // 基础数据类型
      if (key) {
        result[key] = value
      }
    } else if (Array.isArray(value)) {
      // 数组类型
      for (let i = 0; i < value.length; i++) {
        process(`${key}[${i}]`, value[i])
      }
      if (value.length === 0) {
        result[key] = []
      }
    } else {
      // 对象类型
      let objArr = Object.keys(value)
      objArr.forEach((item) => {
        process(key ? `${key}.${item}` : `${item}`, value[item])
      })
      if (objArr.length === 0 && key) {
        result[key] = {}
      }
    }
  }
  process('', obj)
  return result
}

let a = flatten(obj1)

console.log(a)
