/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
  if (n <= 1) return 0;
  const dp = new Array(n);
  // 拆分成多个数字i
  for (let i = 2; i <= n; i++) {
    let curMax = 0;
    for (let j = 1; j < i; j++) {
      curMax = Math.max(curMax, Math.max(j * (i - j), j * dp[i - j]));
    }
    dp[i] = curMax;
  }
};
