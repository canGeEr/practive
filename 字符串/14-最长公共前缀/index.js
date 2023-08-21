/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  const strsSize = strs.length;
  const str = strs[0];
  // 长度为1
  if (strsSize === 1) {
    return str;
  }

  let length = str.length;
  let samePrefix = "";
  for (let i = 0; i < length; i++) {
    const sameChar = str[i];
    // 相邻字符串 i 两个值不相等
    for (let j = 1; j < strsSize; j++) {
      // 超过长度
      if (!strs[j][i] || strs[j][i] !== sameChar) {
        return samePrefix;
      }
    }
    samePrefix += sameChar;
  }

  return samePrefix;
};

// var longestCommonPrefix = function (strs) {
//   const strsSize = strs.length;
//   // 长度为1
//   if (strsSize === 1) {
//     return strs[0];
//   }
// };
const test = [
  ["flower", "flow", "flight"],
  ["dog", "racecar", "car"],
  ["dog", "dacecar", "dar"],
];

/**
 * 这里其实可以考虑分治算法
 */

console.log(test.map(longestCommonPrefix));
