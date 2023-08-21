const { gcd } = require("../1979-找出数组的最大公约数");

// 最小公倍数 * 最大公因数 = 两数乘积
function lcm(a, b) {
  const max = Math.max(a, b);
  const min = max === a ? b : a;

  return (max * min) / gcd(max, min);
}

const test = [
  [32, 48],
  [6, 4],
  [1, 13],
];

console.log(test.map((item) => lcm(...item)));
