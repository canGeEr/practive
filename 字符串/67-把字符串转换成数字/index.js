/**
 * @param {string} str
 * @return {number}
 */
var strToInt = function (str) {
  let transfer = parseInt(str);
  if (isNaN(transfer)) return 0;
  // 超出范围
  const unit = transfer / Math.abs(transfer);
  if (unit === -1) {
    return Math.max(transfer, -(2 ** 31));
  }
  if (unit === 1) {
    return Math.min(transfer, 2 ** 31 - 1);
  }
  return transfer;
};

var strToInt = function (str) {
  const INT_MIN = -(2 ** 31);
  const INT_MAX = 2 ** 31 - 1;
  const INT_MIN_STRING = String(-INT_MIN);
  const INT_MAX_STRING = String(INT_MAX);

  let intStr = /^\s*([+-]?\d+)/.exec(str)?.[1];

  if (!intStr) return 0;
  // 是否为负数
  let [, unitChar, nub] = /^([+-]?)0*(\d*)$/.exec(intStr);
  if (!nub) return 0;

  if (
    unitChar === "-" &&
    (INT_MIN_STRING.length < nub.length ||
      (INT_MIN_STRING.length === nub.length && nub >= INT_MIN_STRING))
  ) {
    return INT_MIN;
  }

  if (
    unitChar !== "-" &&
    (INT_MAX_STRING.length < nub.length ||
      (INT_MAX_STRING.length === nub.length && nub >= INT_MAX_STRING))
  ) {
    return INT_MAX;
  }

  return Number(intStr);
};

const test = [
  "-2147483648",
  "    +1146905820n1",
  "    +0a32",
  "  0000000000012345678",
  "  0000000000012345678000000",
  "42",
  " -42",
  " -420 ",
  "4193 with words",
  "-91283472332",
];

console.log(test.map(strToInt));

/**
 * 考点
 * parseInt + 条件过滤
 *
 */
