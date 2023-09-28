/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  // 遇到数字就需要开始读了 number[xxxx]
  // 字符串的堆栈
  const stack = [];
  let start = 0;
  const length = s.length;
  while (start < length) {
    const char = s[start];
    // 判断是否为数字
    if (isNumber(char)) {
      const result = getNumber(s, start);
      // 当前是数字的结尾了
      start = result.start;
      stack.push(result.value);
    }
    if (isWord(char)) {
      const result = getWord(s, start);
      start = result.start;
      stack.push(result.value);
    }
    if (char === "]") {
      // 一直pop直到'['
      const words = [];
      while (stack.at(-1) !== "[") {
        words.push(stack.pop());
      }
      // 弹出'['
      stack.pop();
      // 当前重复的数字
      const repeatTime = stack.pop();
      const targetStr = words.reverse().join("");
      stack.push(targetStr.repeat(repeatTime));
    }
    if (char === "[") {
      stack.push(char);
    }

    start++;
  }
  return stack.join("");
};

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

const wordRegexp = /[a-z]+/;
/**
 *
 * @param {string} char
 */
function isWord(char) {
  return char && wordRegexp.test(char);
}

/**
 *
 * @param {string} s
 * @param {number} start
 */
function getWord(s, start) {
  const words = [s[start]];
  while (isWord(s[start + 1])) {
    words.push(s[start + 1]);
    start++;
  }
  return { value: words.join(""), start };
}

const test = [
  // "3[a]2[bc]", "3[a2[c]]",
  "2[abc]3[cd]ef",
];

console.log(test.map(decodeString));
