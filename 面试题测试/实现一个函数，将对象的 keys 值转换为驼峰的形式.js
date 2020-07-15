// 题目示例
let a = {
  a_b: true
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
      },
    },
    {
      d_d: false,
    },
  ]
}

let c = [
  {
    a_a: 'aa',
  },
  {
    b_b: 'bb',
  }
]

// 实现
const camelcase = (obj) => {
  if(obj === '[]' || obj === '{}') {
    
  }
}
