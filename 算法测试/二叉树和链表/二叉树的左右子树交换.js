/*
 * @Author: songyu
 * @Date: 2021-07-06 20:37:57
 * @LastEditTime: 2021-07-06 20:37:57
 * @LastEditors: songyu
 * @Description:
 * @FilePath: \项目文件\jsDifficulty\算法测试\二叉树和链表\二叉树的左右子树交换.js
 */
var invertTree = function (root) {
  if (root === null) return null;
  const left = invertTree(root.left);
  const right = invertTree(root.right);
  root.left = right;
  root.right = left;
  return root;
};
