/**
 * @param {number} columnNumber
 * @return {string}
 */
var convertToTitle = function (columnNumber) {
  let reset = columnNumber;
  const number = [];
  while (reset > 26) {
    let bit = reset % 26;
    bit = bit === 0 ? 26 : bit;
    reset = (reset - bit) / 26;
    number.unshift(getBitCode(bit));
  }
  number.unshift(getBitCode(reset));
  return number.join("");
};

function convertToTitle(columnNumber) {
  const res = [];
  while (columnNumber > 0) {
    const a0 = ((columnNumber - 1) % 26) + 1;
    res.push(getBitCode(a0));
    columnNumber = (columnNumber - a0) / 26;
  }
  res.reverse(0);
  return res.join("");
}

function getBitCode(bit) {
  return String.fromCharCode(bit + 64);
}

const test = [1, 9, 28, 701, 2147483647, 52];

console.log(test.map(convertToTitle));

/**
 * 考点
 * 没有零的概念，存在特殊解 AZ，一般情况下B0，因此在考虑的时候需要进行数学换算
 * number = a0 + ai * 10n
 */
