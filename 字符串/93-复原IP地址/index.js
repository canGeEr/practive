/**
 * @param {string} s
 * @return {string[]}
 */
function restoreIpAddresses(s) {
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
    // 扫描超出长度
    if (begin >= length) {
      // 到结尾刚好分成四段的
      if (arr.length === BASE_GAP && begin === length) {
        ans.push(arr.join("."));
      }
      return;
    }
    // 最长也只是三次
    for (let i = 0; i < 3; i++) {
      const end = begin + i;
      const iStr = s.substring(begin, end + 1);
      // 从begin到i的字符串
      if (isIpInteger(iStr)) {
        arr.push(iStr);
        lookBack(end + 1, arr);
        arr.pop();
      }
    }
  }
  // 从零开始扫描
  lookBack(0, []);

  return ans;
}

// 每次最大能取3个
// f[i]，只取 s[i-1]，如果能成功表示，那么f[i-1]
// f[i]，只取 s[i-2]，判断两者是否能组合符合要求的地址快，如果能那么 f[i-2]
// f[i], 只取 s[i-3]，判断三者是否能组成符合要求的复制，如果可以那么 f[i - 3]
/**
 * @param {string} s
 */
function restoreIpAddresses(s) {
  const length = s.length;
  // 当前是求dp[length]
  const dp = new Array(length + 1).fill(0);
  // dp 3看成3份，每一个数字是否能组成一份
  dp[4] = Number(s.substring(0, 3).split("").every(isIpInteger));

  for (let i = 5; i <= length; i++) {
    // 感觉这里的加法有问题
    // 只使用一个字符
    if (isIpInteger(s[i - 1])) {
      dp[i] += dp[i - 1];
    }
    // 为什么i有两次判断，因为截取之后，需要判断前面的数字是否还能分成 3份，因此必须大禹3
    if (i >= 2 && isIpInteger(s.substring(i - 2, i)) && i - 2 >= 3) {
      dp[i] += dp[i - 2];
    }
    if (i >= 3 && isIpInteger(s.substring(i - 3, i)) && i - 3 >= 3) {
      dp[i] += dp[i - 3];
    }
  }
  return dp;
  // return dp[length];
}

function isIpInteger(str) {
  const strNub = Number(str);
  return String(strNub) === str && str <= 255;
}

const test = [
  "25525511135",
  // "0000",
  "101023",
  "d000",
];

console.log(test.map(restoreIpAddresses));

/**
 * 考点，确实是回溯法，取0 1 2 3 4，取四段位置
 * 如果考察能复原多少个，需要使用动态规划
 */
