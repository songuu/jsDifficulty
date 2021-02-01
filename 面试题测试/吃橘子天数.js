/**
 * @param {number} n
 * @return {number}
 */
var minDays = function (n) {
  let tmp = new Map([
    [1, 1],
    [2, 2],
    [3, 2],
  ])

  function count(num) {
    if (tmp.has(num)) return tmp.get(num)
    const t =
      Math.min(
        count(Math.floor(num / 3)) + (num % 3),
        count(Math.floor(num / 2)) + (num % 2)
      ) + 1
    tmp.set(num, t)
    return t
  }

  const res = count(n)
  return res
}

let a = minDays(10);

console.log(a)