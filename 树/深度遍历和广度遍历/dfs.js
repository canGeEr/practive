const test = require("./test.json");

// depth first search 期望输出 char a d e b f c
function dfs(root, path = []) {
  path.push(root.value);
  root.children?.forEach((item) => dfs(item, path));
  return path;
}

// 注意这里是前序遍历
function dfsByStack(root) {
  const path = [];
  const stack = [root];
  // 每个子节点都需要回归，可以这么理解
  while (stack.length) {
    // 顶部的值
    const top = stack.pop();
    path.push(top.value);
    const { children } = top;
    if (children) {
      const length = children.length;
      // 反向添加
      for (let i = length - 1; i >= 0; i--) {
        stack.push(children[i]);
      }
    }
  }
  return path;
}

// 如果是二叉树
function dfsByStackPre(root) {
  const stack = [];
  const path = [];
  while (root || stack.length) {
    // 一直找到最左
    while (root) {
      stack.push(root);
      root = root.children?.[0];
    }
    root = stack.pop();
    path.push(root.value);
    root = root.children?.[1];
  }
  return path;
}

console.log(test.map((item) => dfsByStackPre(item).join(" => ")));
