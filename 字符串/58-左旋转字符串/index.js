/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
  if(n >= s.length) return s

  const sArr = Array.from(s);

  function reversal(start, end) {
    let temp = ''
    const center = (end + start) / 2
    for(let i=start; i <= center; i++) {
      temp = sArr[i];
      sArr[i] = sArr[end - (i - start)];
      sArr[end - (i - start)] = temp;
    }
  }

  reversal(0, n - 1);
  reversal(n, s.length - 1);
  reversal(0, s.length - 1);
  return sArr.join('')
};

const test = [
  "abcdefg",
  "lrloseumgh"
]

console.log(test.map((str) => reverseLeftWords(str, 6)))

/**
 * 考点
 * 1. 常规遍历，遍历旋转前，遍历旋转后，拼接
 * 2. 考虑边界
 */