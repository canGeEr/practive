/**
 * 无用重复的最长子串
 * @param {string} str
 */
function lengthOfLongestSubstring(str) {
  const length = str.length;
  if (!length) return 0;
  let left, right;
  left = right = 0;
  const set = new Set();
  let max = 1;
  // 从第一位开始遍历，当前字符中是否有重复的
  while (right < length) {
    const char = str[right];
    // 如果重复了，那就把头开始的字符丢弃，一直丢弃到没有重复的为止
    while (set.has(char)) {
      // 删除掉已经存在的
      set.delete(str[left]);
      left++;
    }
    // 不重复加入set
    set.add(char);
    // 当前right可用，确定能增加长度
    max = Math.max(max, right - left + 1);
    right++;
  }

  return max;
}

const test = ["abcabcbb", "bbbbb", "pwwkew"];

console.log(test.map(lengthOfLongestSubstring));
