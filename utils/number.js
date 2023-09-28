// 至少一个数字
const numberRegexp = /\d+/;
/**
 * @param {*} char
 */
function isNumber(char) {
  return char && numberRegexp.test(char);
}

/**
 *
 * @param {string} s
 * @param {number} start
 * @returns { {value: number; start: number} }
 */
function getNumber(s, start) {
  let sum = Number(s[start]);
  // 下一个还是数字
  while (isNumber(s[start + 1])) {
    sum = sum * 10 + Number(s[start + 1]);
    start++;
  }
  return { value: sum, start };
}

module.exports = {
  isNumber,
  numberRegexp,
  getNumber,
};

Math.floor;
