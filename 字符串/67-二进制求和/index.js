/**
 * 考点
 * 1. 二进制的反码，补码，原码（看起来并不是）
 * 2. API
 * 3. 设计一个加法器
 */
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  const al = a.length,
    bl = b.length;
  const length = Math.max(al, bl);
  const str = new Array(length);
  let lastBitOver = false;
  for (let i = 0; i < length; i++) {
    const aBitValue = Number(a[al - 1 - i]) || 0;
    const bBitValue = Number(b[bl - 1 - i]) || 0;
    // 上一位的进位
    const sum = aBitValue + bBitValue + Number(lastBitOver);
    // 溢出向前进位
    lastBitOver = sum >= 2;
    // 溢出去除
    str[length - 1 - i] = sum % 2;
  }
  // 可能超出位
  if (lastBitOver) {
    str.unshift(1);
  }

  return str.join("");
};

const test = [
  ["11", "1"],
  ["1010", "1011"],
  [
    "10100000100100110110010000010101111011011001101110111111111101000000101111001110001111100001101",
    "110101001011101110001111100110001010100001101011101010000011011011001011101111001100000011011110011",
  ],
];

console.log(test.map((item) => addBinary(...item)));
