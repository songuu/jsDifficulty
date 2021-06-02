/*
 * @Author: songyu
 * @Date: 2021-05-27 09:58:57
 * @LastEditor: songyu
 * @LastEditTime: 2021-05-27 09:59:23
 */
function ReverseList(pHead) {
  let list = null
  let p = pHead
  let q = null
  if (p === null) return null
  while (p.next !== null) {
    q = p.next
    p.next = list
    list = p
    p = q
  }
  p.next = list
  list = p
  return list
}
