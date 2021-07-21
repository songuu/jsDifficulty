/*
 * @Author: songyu
 * @Date: 2021-07-06 20:36:23
 * @LastEditTime: 2021-07-06 20:36:45
 * @LastEditors: songyu
 * @Description: 
 * @FilePath: \项目文件\jsDifficulty\算法测试\二叉树和链表\二叉树的最大深度.js
 */

var maxDepth = function(root) {
    if (!root) {
        return 0
    }
    const left = maxDepth(root.left)
    const right = maxDepth(root.right)
    return Math.max(left, right) + 1
};