/**
 *
 * @param {string} str
 */
function replace(str) {
  const regexp = /\s(?=\d)\s/;
  const result = str.match(regexp);
  return result;
}

// 匹配环节和替换环节 \1 => \n, $1 => $n

const test = ["aa aa 1 cc 就这", "hao ary you?"];

console.log(test.map(replace));
