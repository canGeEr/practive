/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  const regexp = /[a-zA-Z0-9]/;
  const length = s.length;
  let i = 0,
    j = length - 1;
  while (i < j) {
    while (i < j && !regexp.test(s[i])) i++;
    while (i < j && !regexp.test(s[j])) j--;
    if (i >= j) break;
    // 满足条件才进行
    if (s[i].toLowerCase() !== s[j].toLowerCase()) return false;
    i++;
    j--;
  }
  return true;
};

const test = [
  " d s  1    a ds a d as d a            1   s d ",
  "A man, a plan, a canal: Panama",
  "race a car",
  " ",
];

console.log(test.map(isPalindrome));
