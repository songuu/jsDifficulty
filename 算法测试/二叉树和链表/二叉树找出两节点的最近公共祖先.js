/*
 * @Author: songyu
 * @Date: 2021-07-06 20:39:03
 * @LastEditTime: 2021-07-06 20:39:04
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\jsDifficulty\算法测试\二叉树和链表\二叉树找出两节点的最近公共祖先.js
 */
const lowestCommonAncestor = (root, p, q) => {
  while (root) {
    if (p.val < root.val && q.val < root.val) {
      root = root.left;
    } else if (p.val > root.val && q.val > root.val) {
      root = root.right;
    } else {
      break;
    }
  }
  return root;
};
