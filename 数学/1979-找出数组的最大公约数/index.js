/**
 * @param {number[]} nums
 * @return {number}
 */
var findGCD = function (nums) {
  const max = Math.max(...nums);
  const min = Math.min(...nums);
  // let a = max,
  //   b = min;
  // let temp;
  // while (a % b !== 0) {
  //   temp = b;
  //   b = a % b;
  //   a = temp;
  // }
  return gcd(max, min);
};

function gcd(big, small) {
  const nextSmall = big % small;
  if (!nextSmall) return small;
  return gcd(small, big % small);
}

const test = [
  [2, 5, 6, 9, 10],
  [7, 5, 6, 8, 3],
  [3, 3],
];

// console.log(test.map(findGCD));
module.exports = {
  gcd,
};

// 辗转相除法 a = kb + r，当 r = 0 的时候最小公因数
