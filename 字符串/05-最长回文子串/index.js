/**
 *
 * @param {string} str
 */
function longestPalindrome(str) {
  const length = str.length;
  // i, j 是否为字符串
  const dp = new Array(length).fill(0).map(() => new Array(length));
  let max = 1;
  let start = 0;
  // 长度
  for (let i = 1; i <= length; i++) {
    for (let j = 0; j < length; j++) {
      const left = j;
      const right = j + i - 1;
      // 程度超过了
      if (right >= length) break;
      // 如果长度为1，默认是回文子串
      if (i <= 2) {
        dp[left][right] = str[left] === str[right];
      } else {
        // 网内收缩
        dp[left][right] = dp[left + 1][right - 1] && str[left] === str[right];
      }
      if (dp[left][right] && i > max) {
        start = left;
        max = i;
      }
    }
  }

  return str.slice(start, start + max);
}

const test = ["babad", "cbbd"];

console.log(test.map(longestPalindrome));
