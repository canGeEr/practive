/**
 *
 * @param {*} styles
 * @returns dfs 递归方式
 */
function allList(styles) {
  const allStyleList = [];
  function deep(currentList) {
    if (currentList.length === 3) {
      allStyleList.push(currentList);
      return;
    }
    const levelSkuList = styles[currentList.length].list;
    for (let sku of levelSkuList) {
      deep([...currentList, sku]);
    }
  }
  deep([]);
  return allStyleList;
}

const test = [
  [
    {
      name: "姓名",
      list: ["吴灿", "咏数", "军军"],
    },
    {
      name: "性别",
      list: ["男", "女"],
    },
    {
      name: "年龄",
      list: ["22", "30", "28"],
    },
  ],
];

/**
 * 拓展法
 */

function allList(styles) {
  let preStyleList = [];
  const length = styles.length;
  for (let i = 0; i < length; i++) {
    // 获取当次的列表
    const { list } = styles[i];
    // 当次的列表和上一次列表n * n
    const nextStyleList = [];
    if (!preStyleList.length) {
      preStyleList = list.map((item) => [item]);
      continue;
    }
    // 不用变
    if (!list.length) {
      continue;
    }
    for (let preStyle of preStyleList) {
      for (let style of list) {
        nextStyleList.push([...preStyle, style]);
      }
    }
    preStyleList = nextStyleList;
  }
  return preStyleList;
}

console.log(test.map(allList));
