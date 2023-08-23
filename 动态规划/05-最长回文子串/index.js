/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  const length = s.length;
  let dp = new Array(length).fill(0);
  dp = dp.map(() => []);
  for (let i = 0; i < length; i++) {
    dp[i][i] = true;
  }
  let max = 1;
  let startIndex = 0;
  for (let l = 2; l <= length; l++) {
    for (let i = 0; i < length; i++) {
      let j = i + l - 1;
      // 判断i j 是否为回文子串
      if (j >= length) break;
      const currentIsSame = s[i] === s[j];
      if (l === 2) {
        dp[i][j] = currentIsSame;
      } else {
        // 往内缩的长度和当前两边的正确性
        dp[i][j] = dp[i + 1][j - 1] && currentIsSame;
      }
      if (dp[i][j]) {
        max = Math.max(max, l);
        startIndex = i;
      }
    }
  }

  return s.substring(startIndex, startIndex + max);
}

const test = ["babad", "cbbd"];

console.log(test.map(longestPalindrome));
