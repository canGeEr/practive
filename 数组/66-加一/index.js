/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  const length = digits.length;
  const ans = new Array(length);
  for (let i = length - 1; i >= 0; i--) {
    if (digits[i] !== 9) {
      digits[i]++;
      for (let j = i + 1; j < length; j++) {
        digits[j] = 0;
      }
      return digits;
    }
  }
  digits.fill(0);
  digits.unshift(1);
  return digits;
};

const test = [[1, 2, 3], [4, 3, 2, 1], [0]];

console.log(test.map(plusOne));

/**
 * 官方原解是修改原来的数组，而不是返回新的数组
 */
