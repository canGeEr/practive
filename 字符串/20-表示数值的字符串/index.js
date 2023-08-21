/**
 * @param {string} s
 * @return {boolean}
 */

// ([e|E]\d+)? 代表 e /^\s*(\+|\-)?\d+(\.\d+([e|E]\d+)?)?\s*$/
var isNumber = function(s) {
  return /^\s*[+|-]?(\d+\.\d*|\.\d*|\d+)([e|E][+|-]?\d+)?\s*$/.test(s)
};
// 可能没有小数点 1.整数 2.小数
// \d*(\.\d*) \d+\.\d* | \.\d*


// \.\d+([e|E]\d+)?

const test =["12e", "1a3.14", "1.2.3", "+-5", "12e+5.4"]

console.log(test.map(isNumber))