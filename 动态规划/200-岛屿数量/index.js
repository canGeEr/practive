const test = [
  [
    ["1", "1", "1", "1", "0"],
    ["1", "1", "0", "1", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "0", "0", "0"],
  ],
  [
    ["1", "1", "0", "0", "0"],
    ["1", "1", "0", "0", "0"],
    ["0", "0", "1", "0", "0"],
    ["0", "0", "0", "1", "1"],
  ],
  [
    ["1", "1", "1"],
    ["0", "1", "0"],
    ["1", "1", "1"],
  ],
];
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const width = grid[0].length;
  const height = grid.length;
  // 创建和grid一致的数组
  // const dp = new Array(height).fill(0).map(() => new Array(width));
  let sum = 0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      // 如果当前位置被检索过，直接跳过
      if (grid[i][j] === "1") {
        sum++;
        mark(i, j);
      }
    }
  }

  // 从当前位置开始找，右下开始分叉
  function mark(i, j) {
    // 超出范围
    if (i >= height || i < 0 || j >= width || j < 0) return;
    // 非1不连续，另外可能检索回去了
    if (grid[i][j] === "0") return;
    // "1" 置位 0
    grid[i][j] = "0";
    // 四个方向检索
    mark(i - 1, j);
    mark(i + 1, j);
    mark(i, j + 1);
    mark(i, j - 1);
  }

  return sum;
};

console.log(test.map(numIslands));

/**
 * 如果已经被检索的标记成了0，那么下次遍历的时候就不会再经过了
 */
