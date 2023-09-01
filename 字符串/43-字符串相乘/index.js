/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var multiply = function (num1, num2) {
  if (/^0$/.test(num1) || /^0$/.test(num2)) return "0";
  const length = num1.length;
  let sum = "";
  for (let i = length - 1; i >= 0; i--) {
    // 多少个零填充
    const e = length - 1 - i;
    const value = multiSingleStr(num2, num1[i]) + "0".repeat(e);
    sum = addString(value, sum);
  }
  return sum;
};

/**
 *
 * @param {string} str
 * @param {number} value（0 ~ 9）
 */
function multiSingleStr(str, value) {
  const length = str.length;
  let i = length - 1,
    curry = 0;
  const ans = [];
  while (i >= 0) {
    const multi = Number(str[i]) * value + curry;
    const bit = multi % 10;
    ans.push(bit);
    curry = (multi - bit) / 10;
    i--;
  }
  curry && ans.push(curry);
  return ans.reverse().join("");
}

/**
 *
 * @param {string} num1
 * @param {string} num2
 */
function addString(num1, num2) {
  let i1 = num1.length - 1,
    i2 = num2.length - 1,
    curry = 0;
  let ans = [];
  // 任何一个字符串不为空
  while (i1 >= 0 || i2 >= 0) {
    const sum = (Number(num1[i1]) || 0) + (Number(num2[i2]) || 0) + curry;
    const bit = sum % 10;
    ans.push(bit);
    curry = (sum - bit) / 10;
    i1--;
    i2--;
  }
  curry && ans.push(1);
  return ans.reverse().join("");
}

const test = [["123", "456"]];

console.log(test.map((item) => multiply(...item)));
