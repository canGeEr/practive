/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const length = s.length;
  // 有点像是回溯法
  // 判断插入还是不插入，插入之后是否有效，是否还能继续不插入
  // 但是只能有四个证书
  // 必须插入三个点，三个点的位置不确定，确保插入三个点的位置后，三个数有效
  // C(s- 1) 3
  // 3层循环解决
  // i => j > i j
  // 能插入的位置，i [1, s-1]
  const ans = [];
  /**
   *
   * @param {number} currentIndex 当前迭代的位置，范围是[1, length]
   * @param {number} lastInsertIndex 上次插入的位置
   * @param {string []} arr
   * @returns
   */
  function lookBack(currentIndex, lastInsertIndex, arr) {
    // 剩余的插入位置没了 | 已经插入了4个
    if (currentIndex >= length + 1 || arr.length >= 4) {
      // 当且仅当位置迭代完成，并且插入长度为4
      if (arr.length === 4 && currentIndex === length + 1)
        ans.push(arr.join("."));
      return;
    }
    // 需要插入的节点数，大于剩余的节点位置
    if (4 - arr.length > length - currentIndex + 1) return false;
    // 不插入，但是需要减枝，判断是否能不插入
    if (currentIndex - lastInsertIndex < 3) {
      // 只有前一个位置和后一个位置不超过3，才能允许不插入
      lookBack(currentIndex + 1, lastInsertIndex, arr);
    }
    // 插入，但是需要减枝，判断是否能插入
    const str = s.slice(lastInsertIndex, currentIndex);
    const nubStr = Number(str);
    // 含有0或者超过255需要退出
    if (String(nubStr).length !== str.length || nubStr > 255) return;
    // 放入字符串
    arr.push(str);
    lookBack(currentIndex + 1, currentIndex, arr);
    // 复原
    arr.pop();
  }

  lookBack(1, 0, []);

  return ans;
};

const test = [
  // "25525511135",
  "0000",
  "101023",
];

console.log(test.map(restoreIpAddresses));
