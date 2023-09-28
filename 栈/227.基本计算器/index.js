const { isNumber, getNumber } = require("./../../utils/number");

const operatePriority = {
  "-": 0,
  "+": 0,
  "*": 1,
  "/": 1,
};

const operateAction = {
  "-": function (num1, num2) {
    return num1 - num2;
  },
  "+": function (num1, num2) {
    return num1 + num2;
  },
  "*": function (num1, num2) {
    return num1 * num2;
  },
  "/": function (num1, num2) {
    return num1 / num2;
  },
};

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  // 收集操作符号
  const operatorStack = [];
  // 收集数字
  const numberStack = [];
  let start = 0;
  const length = s.length;
  while (start < length) {
    const char = s[start];
    // 如果是数字
    if (isNumber(char)) {
      const result = getNumber(s, start);
      numberStack.push(result.value);
      start = result.start;
    }
    // 是操作符号
    if (operatePriority[char] !== undefined) {
      const lastTopOperator = operatorStack.at(-1);
      // 后续的优先级没有前面的优先级大或者等于，需要先把前面的计算完成
      if (
        lastTopOperator &&
        operatePriority[char] <= operatePriority[lastTopOperator]
      ) {
        calc(numberStack, numberStack);
      } else {
        operatorStack.push(char);
      }
    }
    start += 1;
  }
  calc(numberStack, operatorStack);
  return numberStack.pop();
};

/**
 *
 * @param {number []} numberStack
 * @param {string []} operatorStack
 */
function calc(numberStack, operatorStack) {
  while (operatorStack.length) {
    const operator = operatorStack.pop();
    const number2 = numberStack.pop();
    const number1 = numberStack.pop();
    const result = operateAction[operator](number1, number2);
    numberStack.push(result);
  }
}

const test = [
  // "3+2*2", " 3/2 ", " 3+5 / 2 ",
  "1-1+1",
];

console.log(test.map(calculate));
