/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  function quickMul(x, N) {
    if (N === 0) return 1;
    const y = quickMul(x, Math.floor(N / 2));
    return N % 2 === 0 ? y * y : y * y * x;
  }
  return n >= 0 ? quickMul(x, n) : 1 / quickMul(x, -n);
};

// 快每次递推
// 存储一个每次递推之后的结果，快速接近值，如果还需要多少那么
