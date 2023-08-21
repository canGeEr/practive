/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x === 0) return true;
  if (x < 0) return false;
  const s = String(x);
  const length = s.length;
  for (let i = 0; i < length - 1 - i; i++) {
    if (s[i] !== s[length - 1 - i]) return false;
  }
  return true;
};

// 进阶
function isPalindrome(x) {
  // 末尾为0的直接去掉
  if (x < 0 || (x % 10 === 0 && x !== 0)) {
    return false;
  }

  let revertedNumber = 0;
  while (revertedNumber < x) {
    const bit = x % 10;
    x = x - bit / 10;
    revertedNumber = revertedNumber * 10 + bit;
  }

  return revertedNumber === x || x === Math.floor(revertedNumber / 10);
}

const test = [121, -121, 10];

console.log(test.map(isPalindrome));
