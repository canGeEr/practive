/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
  let sum = 0;
  const length = columnTitle.length;
  for (let i = length - 1; i >= 0; i--) {
    sum += getCharCode(columnTitle[i]) * 26 ** (length - 1 - i);
  }
  return sum;
};

/**
 * @param {string} char
 */
function getCharCode(char) {
  return char.charCodeAt(0) - 64;
}

const test = ["A", "AB", "ZY"];

console.log(test.map(titleToNumber));
