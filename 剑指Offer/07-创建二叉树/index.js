const TreeNode = require("../utils/node");
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  // 收集inorder value => index的依赖
  const map = inorder.reduce((map, value, index) => {
    map[value] = index;
    return map;
  }, {});
  /**
   *
   * @param {*} preorderStart
   * @param {*} preorderEnd
   * @param {*} inorderStart
   * @param {*} inorderEnd
   * 找到第一个列表的第一个节点，它就是中心节点，
   * 根据这个中心节点第二个列表分为 左子树的中序遍历，右子树的中序遍历
   */
  function build(preorderStart, preorderEnd, inorderStart, inorderEnd) {
    if (preorderStart > preorderEnd || inorderStart > inorderEnd) return null;
    const root = new TreeNode(preorder[preorderStart]);
    // 左侧的节点数量，因为需要减去root本身
    const inorderCenterByRoot = map[root.val];
    const subLeftTreeLength = inorderCenterByRoot - inorderStart;

    root.left = build(
      // preorderStart 左子树的前序遍历
      preorderStart + 1,
      preorderStart + subLeftTreeLength,
      // inorderStart的左子树的中序遍历
      inorderStart,
      inorderCenterByRoot - 1
    );
    root.right = build(
      // preorderStart右子树的前序遍历
      preorderStart + subLeftTreeLength + 1,
      preorderEnd,
      // inorderStart右子树的中序遍历
      inorderCenterByRoot + 1,
      inorderEnd
    );

    return root;
  }

  return build(0, preorder.length - 1, 0, inorder.length - 1);
};

const test = [
  [
    [3, 9, 20, 15, 7],
    [9, 3, 15, 20, 7],
  ],
  [[-1], [-1]],
];

console.log(test.map((item) => buildTree(...item).toString()));
