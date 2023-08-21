/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const charMap = {
    "(": ")",
    "{": "}",
    "[": "]",
    ")": undefined,
    "}": undefined,
    "]": undefined,
  };
  const stack = [];
  const length = s.length;
  for (let i = 0; i < length; i++) {
    const char = s[i];
    if (charMap[char]) {
      stack.push(char);
    } else if (char === charMap[stack.at(-1)]) {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length === 0;
};

/**
 * 考点
 * 堆栈
 */

const test = ["()", "()[]{}", "(]", "({[()]})"];

console.log(test.map(isValid));
