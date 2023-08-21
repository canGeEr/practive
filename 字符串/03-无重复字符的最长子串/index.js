/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const set = new Set();
  let max = 0;
  let rk = -1,
    n = s.length;
  for (let i = 0; i < n; i++) {
    if (i !== 0) {
      set.delete(s[i - 1]);
    }
    while (rk + 1 < n && !set.has(s[rk + 1])) {
      set.add(s[rk + 1]);
      rk++;
    }
    max = Math.max(max, rk - i + 1);
  }
  return max;
};

const test = ["abcabcbb", "bbbbb", "pwwkew", "dsadsadsa"];

console.log(test.map((item) => lengthOfLongestSubstring(item)));

/**
 * 关键点在于为什么没有想到，固定i呢
 */
