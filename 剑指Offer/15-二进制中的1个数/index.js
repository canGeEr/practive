/**
 *
 * @param {number} n
 */
var hammingWeight = function (n) {
  let sum = 0;
  while (n) {
    const bit = n % 2;
    n = (n - bit) / 2;
    sum += bit;
  }

  return sum;
};

// 比如11 => 5 => 2 => 1 => 0
// 1 0 1 1

const test = [
  11,
  128
]

console.log(test.map(hammingWeight))