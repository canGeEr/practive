/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  let sum = 0;
  const unitMap = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };
  const length = s.length;
  for (let i = 0; i <= length - 1; i++) {
    const unit = s[i];
    if (i <= length - 2 && unitMap[unit] < unitMap[s[i + 1]]) {
      sum -= unitMap[unit];
    } else {
      sum += unitMap[unit];
    }
  }
  return sum;
};

const test = [
  //3
  "III",
  // 4
  "IV",
  // 9
  "IX",
  // 58
  "LVIII",
  // 1994
  "MCMXCIV",
];

console.log(test.map(romanToInt));
