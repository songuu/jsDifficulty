/* 
  在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。 
  除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。 
  如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。

计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。

示例 1:

输入: [3,2,3,null,3,null,1]

     3
    / \
   2   3
    \   \ 
     3   1

输出: 7 
解释: 小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.
示例 2:

输入: [3,4,5,1,3,null,1]

     3
    / \
   4   5
  / \   \ 
 1   3   1

输出: 9
解释: 小偷一晚能够盗取的最高金额 = 4 + 5 = 9.
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/* 
  暴力求解二叉树
  每一层的数量 1 => 2 => 4 => 8
*/

/**
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function (root) {
  let res = dfs(root)
  return Math.max(res[0], res[1])
}

/* 
当前节点选择不偷：当前节点能偷到的最大钱数 = 左孩子能偷到的钱 + 右孩子能偷到的钱
当前节点选择偷：当前节点能偷到的最大钱数 = 左孩子选择自己不偷时能得到的钱 + 右孩子选择不偷时能得到的钱 + 当前节点的钱数 
*/
// （根节点+孙子节点） （父节点）
function dfs(root) {
  // res[0]表示不包括根节点的最大值，res[1]为包含根节点的最大值
  let res = [0, 0]
  if (root === null) return res
  let left = dfs(root.left)
  let right = dfs(root.right)
  // 不包含根节点的最大值为左子树最大值加右子树最大值
  res[0] = Math.max(...left) + Math.max(...right)
  // 包含根节点的最大值为当前节点值加左子树包含根节点的值加右子树包含根节点的值
  res[1] = root.val + left[0] + right[0]
  return res
}

/* 本题的状态转移方程是：root.dp = Math.max((root.val + root.left.sondp + root.right.sondp), (root.sondp))
为节点添加了两个属性：
dp表示偷到当前节点的最大价值
sondp（当前节点的左右孩子的最大价值和）
因此状态转义方程就是：爷爷的最大价值 = Max(爷爷带孙子们的价值，俩儿子的价值)
如果没有儿子或者孙子，就将值设为0 */

var rob1 = function (root) {
  if (!root) {
    return 0
  } else {
    helper(root)
    return root.dp
  }

  function helper(root) {
    if (!root) return
    //后序遍历(左右根节点)
    helper(root.left)
    helper(root.right)
    if (!root.left && !root.right) {
      //叶子节点
      root.dp = root.val
      root.sondp = 0
    } else {
      //有子节点
      // 计算俩儿子的价值
      var leftdp = root.left ? root.left.dp : 0
      var rightdp = root.right ? root.right.dp : 0
      root.sondp = leftdp + rightdp
      root.dp = Math.max(
        root.val +
          (root.left ? root.left.sondp : 0) +
          (root.right ? root.right.sondp : 0),
        root.sondp
      )
    }
  }
}

/* 
  爷爷 + 4个孙子的最大值
  2个儿子的最大值
  求他们的最大值
*/
var rob2 = function (root) {
  if (root === null) return 0

  let money = root.val
  if (root.left !== null) {
    money += rob(root.left.left) + rob(root.left.right)
  }

  if (root.right !== null) {
    money += rob(root.right.left) + rob(root.right.right)
  }

  return Math.max(money, rob(root.left) + rob(root.right))
}

let a = rob2([3, 2, 3, null, 3, null, 1])

console.log(a)
