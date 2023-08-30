/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
  const BASE = 10;
  let curry = 0;
  let num1Right = num1.length - 1;
  let num2Right = num2.length - 1;
  let sum3 = [];
  while (num1Right >= 0 || num2Right >= 0) {
    const sum =
      curry + Number(num1[num1Right] || 0) + Number(num2[num2Right] || 0);
    sum3.push(sum % BASE);
    curry = sum >= BASE;
    num2Right--;
    num1Right--;
  }
  curry && sum3.push(1);
  return sum3.reverse().join("");
};

const test = [
  ["111", "222"],
  ["9999", "11111"],
  ["9", "0"],
  ["9", "1"],
];

console.log(test.map((item) => addStrings(...item)));
