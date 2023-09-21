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

function dfsByStack(root) {
  let current = root;
  const stack = [];
  const ans = [];
  while (stack.length || current) {
    // 一直往左
    while (current) {
      ans.push(current.value);
      stack.push(current);
      // 访问左子树
      current = current.children?.[0];
    }
    // 父节点弹出
    current = stack.pop();
    // 遍历右子树
    current = current.children?.[1];
  }
  return ans;
}

console.log(dfsByStack(test));
