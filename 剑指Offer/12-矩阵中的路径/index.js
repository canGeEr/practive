// board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// [["a","b"],["c","d"]], word = "abcd"

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
function exist(board, word) {
  const height = board.length;
  const width = board[0].length;

  for (let i = 0; i < height; i++) {
    // 对每一个排查
    for (let j = 0; j < width; j++) {
      if (search(i, j)) return true;
    }
  }

  function search(i, j, start = 0) {
    // 界限超过了
    if (i < 0 || i >= height || j < 0 || j >= width) return false;
    const char = board[i][j];
    // 已经扫描过了
    if (char === " ") return false;
    // 如果相等，那么才有机会扫描下一次
    if (char !== word[start]) return false;
    // 完成了所有的查找
    if (start === word.length - 1) return true;
    // 标记当前已读
    board[i][j] = " ";
    // 四个方向扫描
    const result = [
      // 上
      [i - 1, j],
      // 左
      [i, j - 1],
      // 右
      [i, j + 1],
      // 下
      [i + 1, j],
    ].some((item) => search(...item, start + 1));
    // 取消对当前矩阵的影响
    board[i][j] = char;
    return result;
  }

  return false;
}

const test = [
  // [
  //   [
  //     ["A", "B", "C", "E"],
  //     ["S", "F", "C", "S"],
  //     ["A", "D", "E", "E"],
  //   ],
  //   "ABCCED",
  // ],
  [
    [
      ["a", "b"],
      ["d", "c"],
    ],
    "abdc",
  ],
];

console.log(test.map((item) => exist(...item)));
