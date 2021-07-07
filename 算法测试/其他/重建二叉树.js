/*
输入某二叉树的前序遍历和中序遍历的结果，请重建出该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。例如输入前序遍历序列{1,2,4,7,3,5,6,8}和中序遍历序列{4,7,2,1,5,3,8,6}，则重建二叉树并返回。
*/


function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
}
function reConstructBinaryTree(pre, vin) {
    //利用递归实现 其中preStart代表的是先序遍历的第一个节点的下标位置 后边的依次类推
    function rebuild(preStart, preEnd, vinStart, vinEnd) {
        let node = new TreeNode(pre[preStart])
        //判断是否只有一个节点 如果只有一个节点 则返回节点本身
        if ((preStart == preEnd) && (vinStart == vinEnd)) {
            return node
        }
        let index = vin.indexOf(pre[preStart]) //查找树的根节点
        let leftLen = index - vinStart //左子树的长度
        let leftPrend = preStart + leftLen //先选出先序遍历的左子树的所有节点
        if (leftLen > 0) {
            //此时相当于遍历左子树的左子树  因此先序遍历开始的节点需加一 中序遍历结束的节点需减一
            node.left = rebuild(preStart + 1, leftPrend, vinStart, index - 1)
        }
        if (leftLen < preEnd - preStart) {
            node.right = rebuild(leftPrend + 1, preEnd, index + 1, vinEnd)
        }
        return node
    }
    let head = rebuild(0, pre.length - 1, 0, vin.length - 1)
    return head
}
