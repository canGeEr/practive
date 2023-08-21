const test = require("./test.json");

// breath first search 期望输出 root a b c d e f
function bfs(root) {
  const path = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    // 访问
    path.push(node.value);
    node.children?.forEach((item) => queue.push(item));
  }

  return path;
}

console.log(test.map((item) => bfs(item).join(" => ")));
