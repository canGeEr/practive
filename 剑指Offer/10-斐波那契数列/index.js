/**
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
  let prePre = 0,
    pre = 1;
  let i = 2;
  while (i <= n) {
    const iValue = prePre + pre;
    prePre = pre;
    pre = iValue % (1e9 + 7);
    i++;
  }

  return pre;
};

const test = [81];

console.log(test.map(fib));
