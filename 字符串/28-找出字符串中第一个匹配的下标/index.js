const { getNext } = require("./getNext");

/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  if (needle.length > haystack.length || needle.length === 0) return -1;
  // next 数组
  const next = getNext(needle);
  const length = haystack.length;
  for (let i = 0, j = 0; i < length; i++) {
    while (j > 0 && haystack[i] != needle[j]) {
      j = next[j - 1];
    }

    // 发现不相等了，如何恢复
    if (haystack[i] == needle[j]) {
      j++;
    }

    if (j == needle.length) {
      return i - needle.length + 1;
    }
  }
  return -1;
};

/**
 * 1. 暴力枚举
 * 2. kmp算法（next算法，如何跳跃）
 */

const test = [
  ["asadbutsad", "sad"],
  ["leetcode", "leeto"],
];

console.log(test.map((item) => strStr(...item)));
