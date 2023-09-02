/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const height = matrix.length;
  const width = matrix[0].length;
  const ans = [];
  // 反向的循环迭代
  const directionMap = {
    "0,1": "1,0",
    "1,0": "0,-1",
    "0,-1": "-1,0",
    "-1,0": "0,1",
  };
  function lookBack(i, j, direction) {
    // 超出范围
    if (i < 0 || i >= height || j < 0 || j >= width) return false;
    // 已经读过
    if (matrix[i][j] === undefined) return false;
    ans.push(matrix[i][j]);
    // 标记没有了，下次访问碰壁
    matrix[i][j] = undefined;
    const [row, col] = direction.split(",").map(Number);
    // 提前判断下一个有没有遇到边界
    const hasNext = lookBack(i + row, j + col, direction);
    if (!hasNext) {
      const nextDirection = directionMap[direction];
      const [row, col] = nextDirection.split(",").map(Number);
      lookBack(i + row, j + col, nextDirection);
    }
    return true;
  }
  lookBack(0, 0, "0,1");

  return ans;
};

const test = [
  [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ],
];

console.log(test.map(spiralOrder));
