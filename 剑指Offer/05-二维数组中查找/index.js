/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
  const height = matrix.length;
  const width = matrix[0]?.length;
  if (!height || !width) return false;
  // 如果失败了，可以划分边界
  let boundaryArr = [];
  function lookBack(i, j) {
    if (i >= height || j >= width) return false;
    // 任意一个超出边界都失败
    if (boundaryArr.some(([maxI, maxJ]) => i >= maxI && j >= maxJ))
      return false;
    const value = matrix[i][j];
    if (value === target) return true;
    else if (value < target) {
      return lookBack(i, j + 1) || lookBack(i + 1, j) || false;
    } else {
      boundaryArr.push([i, j]);
      return false;
    }
  }
  return lookBack(0, 0);
};

// 通过二分法，查找目标i
function middleSearch() {}

const test = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30],
];

console.log([20].map((target) => findNumberIn2DArray(test, target)));
