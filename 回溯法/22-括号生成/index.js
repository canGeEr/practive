/**
 * @param {number} n
 * @return {string[]}
 */
// 关键是什么时机允许执行loop
var generateParenthesis = function (n) {
  const res = [];
  function loop(n, res, left, right, str = "") {
    if (str.length === 2 * n) {
      res.push(str);
      return;
    }
    if (left < n) {
      loop(n, res, left + 1, right, `${str}(`);
    }
    if (right < left) {
      loop(n, res, left, right + 1, `${str})`);
    }
  }
  loop(n, res, 0, 0);
  return res;
};

const test = [3, 2, 1];

/**
 * 如果实在没有思路可以试试列表，并找规律
 * 回溯法，去除不满足的条件
 * 一旦遇到指数级增长问题，考虑是不是需要递归来穷举遍历
 */

console.log(test.map((item) => generateParenthesis(item)));
