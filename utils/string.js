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

module.exports = {
  getWord,
  isWord,
  wordRegexp,
};
