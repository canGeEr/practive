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
    if (char === "(") {
      operatorStack.push("(");
    }
    // 把当前所有的内容全部计算一遍
    if (char === ")") {
      while (operatorStack.length) {
        const lastOperator = operatorStack.at(-1);
        if (lastOperator === "(") {
          operatorStack.pop();
          break;
        } else {
          calc(numberStack, operatorStack);
        }
      }
    }
    // 如果是数字
    if (isNumber(char)) {
      const result = getNumber(s, start);
      numberStack.push(result.value);
      start = result.start;
    }
    // 是操作符号
    if (operatePriority[char] !== undefined) {
      // 后续的优先级没有前面的优先级大或者等于，需要先把前面的计算完成
      while (operatorStack.length) {
        const lastOperator = operatorStack.at(-1);
        // 栈中的优先级 大于/等于 当前优先级
        if (operatePriority[lastOperator] >= operatePriority[char]) {
          calc(numberStack, operatorStack);
        } else {
          break;
        }
      }
      operatorStack.push(char);
    }
    start += 1;
  }
  while (operatorStack.length) {
    calc(numberStack, operatorStack);
  }
  return numberStack.pop();
};

/**
 *
 * @param {number []} numberStack
 * @param {string []} operatorStack
 */
function calc(numberStack, operatorStack) {
  // 取出一个操作符
  const operator = operatorStack.pop();
  // 取出两个数字
  const number2 = numberStack.pop();
  const number1 = numberStack.pop();
  const result = operateAction[operator](number1, number2);
  numberStack.push(Math.floor(result));
}

const test = [
  "(3+2)*2",
  // " 3/2 ",
  // " 3+5 / 2 ",
  // "1-1+1",
  // "14/3*2",
  // "1+2*5/3+6/4*2",
];

console.log(test.map(calculate));

/**
 * todo
 * 考虑数字是否存在-号或者+号
 */
