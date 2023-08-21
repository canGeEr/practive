// depth first search 期望输出 root a d e b f c
function dfs(root, path = "") {
  if (!path) {
    path = root.value;
  } else {
    path += ` => ${root.value}`;
  }
  console.log(root.value);
  // if (!root.children) {
  //   console.log(path);
  //   return;
  // }
  root.children?.forEach((item) => dfs(item, path));
}

// breath first search 期望输出 root a b c d e f
function bfs(root) {
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    // 访问
    console.log(node.value);
    node.children?.forEach((item) => queue.push(item));
  }
}

const test = {
  value: "root",
  children: [
    {
      value: "a",
      children: [
        {
          value: "d",
        },
        {
          value: "e",
        },
      ],
    },
    {
      value: "b",
      children: [
        {
          value: "f",
        },
      ],
    },
    {
      value: "c",
    },
  ],
};
// 标准输出新婚下

dfsByStack(test);
