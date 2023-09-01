/**
 * @param {string} s
 * @return {number}
 */
function numDecodings(s) {
  // dfs回溯，退出条件是begin到底溢出
  const length = s.length;
  const ans = [];
  /**
   *
   * @param {number} begin
   * @param {string[]} arr
   */
  function lookBack(begin, arr) {
    if (begin >= length) {
      return ans.push(arr.join(" "));
    }
    for (let i = begin; i < length; i++) {
      // i ~ begin 截取
      const str = s.substring(begin, i + 1);
      const strNub = Number(str);
      if (String(strNub) === str && strNub >= 1 && strNub <= 26) {
        arr.push(str);
        lookBack(i + 1, arr);
        arr.pop();
      }
      // 如果已经大于26了，那后面的不用看
      if (strNub > 26) break;
    }
  }
  lookBack(0, []);

  return ans;
}

// function numDecodings(s) {
//   const length = s.length;
//   const dp = new Array(length + 1).fill(0);
//   // 空字符串
//   dp[0] = 1;
//   // 长度
//   for (let i = 1; i <= length; i++) {
//     // 单独是0不在范围
//     if (s[i - 1] !== "0") {
//       dp[i] += dp[i - 1];
//     }
//     // 前一个不能为0，不然无法组成数字
//     if (
//       i >= 2 &&
//       s[i - 2] !== "0" &&
//       Number(s[i - 2]) * 10 + Number(s[i - 1]) <= 26
//     ) {
//       dp[i] += dp[i - 2];
//     }
//   }
//   return dp[length];
// }

const test = [
  "12",
  "226",
  // "1111111111111111111111"
];

console.log(test.map(numDecodings));

/**
 * 考点一，回溯
 * 考点二、动态规划
 */
// 所有做题还是需要回归元素
