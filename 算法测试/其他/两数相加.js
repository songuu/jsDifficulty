/* 
给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。


输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.

输入：l1 = [0], l2 = [0]
输出：[0]

输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

/*
 * 思路
 * 主要是进位的记录
 */

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

var addTwoNumbers = function (l1, l2) {
  let list = new ListNode(); // 新建一个链表结构

  let curr = list;

  let carry = 0; // 进位

  while (l1 !== null || l2 !== null) {
    let sum = 0;

    if (l1 !== null) {
      sum += l1.value;
      l1 = l1.next;
    }

    if (l2 !== null) {
      sum += l2.value;
      l2 = l2.next;
    }

    sum += carry; // * 计算当前显示的和

    curr.next = new ListNode(sum % 10); // * 下一个节点

    carry = Math.floor(sum / 10); // * 计算最新的进位

    curr = curr.next; // * 移动节点
  }

  // * 还需要最后计算 如果有进位 就需要新建一个节点

  if (carry > 0) {
    curr.next = new ListNode(carry);
  }

  return list.next;
};

var addTwoNumbers = function (l1, l2) {
  let dummy = new ListNode();
  let curr = dummy;
  let carry = 0;
  while (l1 !== null || l2 !== null) {
    let sum = 0;
    if (l1 !== null) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2 !== null) {
      sum += l2.val;
      l2 = l2.next;
    }
    sum += carry;
    curr.next = new ListNode(sum % 10);
    carry = Math.floor(sum / 10);
    curr = curr.next;
  }
  if (carry > 0) {
    curr.next = new ListNode(carry);
  }
  return dummy.next;
};
