/**
 * @param {number} n
 * @return {number}
 */
var cuttingRope = function (n) {
  // 本质原因是，选一位或者两位就结束了
  // 加色
  // dp[i][j] => 长度i的绳子，分成j段
  // dp[i-1][j-1] 单独抽一段
  // dp[i-2][j-1] 单独抽两段
  // dp[i][j] = dp[i-1][j-1] + .... dp[j-1][j-1]，只能分到只有j段
  const dp = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));
  // dp[i][j] 长度i的绳子，分成j段
  for (let i = 1; i < n; i++) {
    for (let j = 1; j <= i; j++) {
      if (i === j) {
        dp[i][j] = 1;
      } else {
        for (let k = j - 1; k < i - 1; k++) {
          dp[i][j] += dp[k][j - 1];
        }
      }
    }
  }

  return dp;
};

const test = [2, 10];

console.log(test.map(cuttingRope));
