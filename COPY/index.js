/**
 *
 * @param {number} n
 */
function generateParenthesis(n) {
  const ans = [];
  // 递归的时候减枝叶
  function lookBack(left, right, arr) {
    if (arr.length === 2 * n) {
      return ans.push(arr.join(""));
    }
    if (left < n) {
      arr.push("(");
      lookBack(left + 1, right, arr);
      arr.pop();
    }
    if (right < left && right < n) {
      arr.push(")");
      lookBack(left, right + 1, arr);
      arr.pop();
    }
  }
  lookBack(0, 0, []);

  return ans;
}

// ["((()))","(()())","(())()","()(())","()()()"]

const test = [1, 2, 3, 4];

console.log(test.map(generateParenthesis));
