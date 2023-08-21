/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  const length = s.length;
  let hasFoundChar = false;
  let sum = 0;
  for (let i = length - 1; i >= 0; i--) {
    const char = s[i];
    if (char === " " && hasFoundChar) {
      break;
    }
    if (char !== " ") {
      hasFoundChar = true;
      sum++;
    }
  }
  return sum;
};

/**
 * 考点
 * 1. 正则
 * 2. 暴力解法，匹配最后一个字符串的i
 * 3. 技巧型：split(' ')
 */
