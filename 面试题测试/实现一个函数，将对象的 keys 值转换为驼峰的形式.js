// 题目示例
let a = {
  a_b: true,
}

let b = {
  id: 'abc',
  nested_obj: {
    f_f: 123,
  },
  nested_arr: [1, 2],
  nested_arr_and_obj: [
    {
      a_a: 'aa',
      b_b: {
        c_c: 'cc',
        e_e: [1, 2, 3],
      },
    },
    {
      d_d: false,
    },
  ],
}

let c = [
  {
    a_a: 'aa',
  },
  {
    b_b: 'bb',
  },
]

// 关键字判断
const deepMapKeys = (obj) => {
  return Array.isArray(obj)
    ? obj.map((val) => deepMapKeys(val))
    : typeof obj === 'object'
    ? Object.keys(obj).reduce((acc, current) => {
        const key = camelMulcase(current, '')
        const val = obj[current]
        acc[key] =
          val !== null && typeof val === 'object' ? deepMapKeys(val) : val;
        console.log(`当前对应的key值为:${key}`)
        console.log(acc)
        return acc
      }, {})
    : obj
}

// 关键字转换(单一下划线)
const camelcase = (str) => {
  return str
    .replace(/(?!^)\_(\w)(\w*)/g, function (a, b, c) {
      return b.toUpperCase() + c.toLowerCase()
    })
    .replace(/^\_/, '')
}

const camelMulcase = (strs, str111) => {
  str111 = /(?!^)\_(\w)(\w*)/g.test(strs)
    ? strs.replace(/(?!^)\_(\w)(\w*)/g, function (a, b, c) {
        return camelMulcase((b.toUpperCase() + c.toLowerCase()), str111)
      })
    : str111 + strs;

  return str111;
}

/* let aaaa = 'ab-ba'.replace(/(?!^)\-(\w)(\w+)/g, function (a, b, c) {
  return b.toUpperCase() + c.toLowerCase()
})

let bbbb = 'a_b'.replace(/(?!^)\_(\w)(\w*)/g, function (a, b, c) {
  return b.toUpperCase() + c.toLowerCase()
})

console.log(aaaa)
console.log(bbbb) */

let result = deepMapKeys(b)

console.log(result)
