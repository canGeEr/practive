/**
 *
 * @param {string} s
 */
var decodeString = function (s) {
  // 解决优先级问题
  const stack = [];
  const length = s.length;

  // for (let i = 0; i < length; i++) {
  //   // 如果是数字
  //   if (isNumber(s[i])) {
  //     let sum = Number(s[i]);
  //     while (isNumber(s[i + 1])) {
  //       sum = sum * 10 + Number(s[i + 1]);
  //       i++;
  //     }
  //     stack.push(sum);
  //     continue;
  //   }
  //   if (isWord(s[i])) {
  //     let str = [s[i]];
  //     while (isWord(s[i + 1])) {
  //       str.push(s[i + 1]);
  //       i++;
  //     }
  //     stack.push(str.join(""));
  //     continue;
  //   }
  //   const char = s[i];
  //   if (char === "]") {
  //     const strArr = [];
  //     while (stack.length && stack.at(-1) !== "[") strArr.push(stack.pop());
  //     // 断言
  //     if (stack.pop() !== "[") debugger;
  //     const times = stack.pop();
  //     // 当前重复的字符串
  //     const repeatStr = getRepeatStr(strArr.reverse().join(""), times);
  //     stack.push(repeatStr);
  //   } else {
  //     stack.push(char);
  //   }
  // }

  // return stack.reduce((all, value) => all + value, "");
};

function getRepeatStr(str, times) {
  let sum = "";
  for (let i = 0; i < times; i++) {
    sum += str;
  }
  return sum;
}

function isNumber(char) {
  return !isNaN(Number(char));
}

function isWord(char) {
  return char !== "[" && char !== "]" && char !== undefined && !isNumber(char);
}

// 3a + 2bc，
const test = ["3[a]2[bc]", "3[a2[c]]", "2[abc]3[cd]ef"];

console.log(test.map(decodeString));
