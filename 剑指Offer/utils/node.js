/**
 *
 * @param {number} val
 */
function TreeNode(val, left, right) {
  this.val = val;
  this.left = left || null;
  this.right = right || null;
}

TreeNode.prototype.toString = function () {
  const ans = [];
  function dfs(root) {
    ans.push(root?.val || null);
    if (!root) return;
    dfs(root.left);
    dfs(root.right);
  }
  dfs(this);
  return ans;
};

module.exports = TreeNode;
