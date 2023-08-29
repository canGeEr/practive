var dailyTemperatures = function (temperatures) {
  const stack = [];
  const length = temperatures.length;
  const ans = new Array(length).fill(0);
  for (let i = 0; i < length; i++) {
    const temperature = temperatures[i];
    while (stack.length && temperatures[stack.at(-1)] < temperature) {
      const top = stack.pop();
      ans[top] = i - top;
    }
    stack.push(i);
  }
  return ans;
};

/**
 * 为什么考察的是栈，什么情况下使用栈
 */

// 其实解题思路还是在暴力解法里，需要观察暴力解法的规律
