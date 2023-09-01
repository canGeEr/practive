/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  const BASE_GAP = 4;
  const length = s.length;
  const ans = [];

  /**
   *
   * @param {number} begin
   * @param {number []} arr
   * @returns
   */
  function lookBack(begin, arr) {
    // 到结尾刚好分成四段的
    if (arr.length === BASE_GAP && begin === length) {
      return ans.push(arr.join("."));
    }
    // 扫描超出长度
    if (begin >= length) return;
    for (let i = begin; i < length; i++) {
      // 从begin到i的字符串
      const iStr = s.substring(begin, i + 1);
      const iStrNub = Number(iStr);
      // 转成数字转回来一致，并且小于255
      if (String(iStrNub) === iStr && iStrNub <= 255) {
        arr.push(iStr);
        lookBack(i + 1, arr);
        arr.pop();
      } else {
        break;
      }
    }
  }
  // 从零开始扫描
  lookBack(0, []);

  return ans;
};

const test = [
  // "25525511135",
  "0000",
  "101023",
];

console.log(test.map(restoreIpAddresses));

/**
 * 考点，确实是回溯法，取0 1 2 3 4，取四段位置
 */
