// next算法
function getNext(str) {
  const length = str.length;
  const next = [];
  next[0] = 0;
  // lastNextValue 永远表示上一个 next
  for (let i = 1, lastNextValue = next[i - 1]; i < length; i++) {
    const value = str[i];

    // 跟最新值比较是否相同，不相同前一段字符串看成next字符串（注意对称规律）
    while (lastNextValue > 0 && str[lastNextValue] !== value) {
      lastNextValue = next[lastNextValue - 1];
    }

    // 如果最后真的找到相等 | 大于0
    if (value === str[lastNextValue]) {
      lastNextValue++;
    }

    next[i] = lastNextValue;
  }
  return next;
}

// 0011230, 000121
const test = ["ABAABAC", "ABCABA"];

console.log(test.map(getNext));

module.exports = {
  getNext,
};
