/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  if (!x) return 0;
  let left = 1,
    right = x;
  let target = 1;
  while (left <= right) {
    // 找到一个数 i * i <= x <= i+1 * i+1
    const middle = Math.floor((left + right) / 2);
    const value = middle * middle;
    // 需要一直逼近
    if (value <= x) {
      target = middle;
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
  return target;
};

const test = [4, 8, 0, 1, 9];

console.log(test.map(mySqrt));
