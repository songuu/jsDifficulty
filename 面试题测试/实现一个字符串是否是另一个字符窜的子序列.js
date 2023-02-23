/**
 * @description:
 * * 给定两个字符窜 s1 和 s2
 * 1. s1 = "ab" s2 = "dsffgsbasa"
 * 2. s1 = "ab" s2 = "dsffgssa"
 * @param {*}
 * @return {*}
 */

/*
 * 取出s1的全排列， 然后看s2 是否包含 s1
 */

const makeSomeSame = (s1, s2) => {
  let len1 = s1.length
  let len2 = s2.length

  if (len1 > len2) {
    return false
  }

  const map1 = {}
  const map2 = {}

  for (let i = 0; i < len1; i++) {
    map1[s1[i]] = map1[s1[i]] ? map1[s1[i]] + 1 : 1
    map2[s1[i]] = map2[s1[i]] ? map2[s1[i]] + 1 : 1
  }

  function match(o1, o2) {
    for (let i in o1) {
      if (o1[i] !== o2[i]) {
        return false
      }
    }
    return true
  }

  for (let k = 0; k <= len2 - len1; k++) {
    if (match(map1, map2)) {
      return true
    } else {
      map2[s2[k + len1]] = map2[s2[k + len1]] ? map2[s2[k + len1]] + 1 : 1
      map2[s2[k]] = map2[s2[k]] - 1
    }
  }

  console.log(map1, map2)

  return false
}

// 首先做s1 的全排列
const makeSomeSame1 = (s1, s2) => {
  let len1 = s1.length
  let len2 = s2.length

  if (len1 > len2) {
    return false
  }

  let s3 = permute2(s1.split('')).reduce(function (prev, cur) {
    return prev.concat(cur.join(''))
  }, [])

  console.log(s3)
  console.log(s2)

  for (let i of s3) {
    if (s2.indexOf(i) > -1) {
      return true
    }
  }

  return false
}

function permute2(nums) {
  let res = []
  perm1(nums, 0, nums.length - 1, res)
  return res
}

// p 全排列的开始位置 q 全排列的结束位置
function perm1(arr, p, q, res) {
  if (p === q) {
    console.log('当前已全部排列完', arr)
    res.push([...arr])
  } else {
    for (let i = p; i <= q; i++) {
      swap1(arr, i, p)
      perm1(arr, p + 1, q, res)
      swap1(arr, i, p) // 这里再次交换是为了保证 arr 的相对一致
    }
  }
}

// 位置交换
function swap1(arr, p, q) {
  ;[arr[p], arr[q]] = [arr[q], arr[p]]
}

let s1 = 'ab'
let s2 = 'ffafafaasasba'

console.log(makeSomeSame(s1, s2))
