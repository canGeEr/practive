/**
 *
 * @param {number} num
 */
function qianFenWei(num) {
  return num.toLocaleString();
}

function qianFenWei(num) {
  const str = String(num);
  const regexp = /(\d)(?=(\d{3})+(?!\d))/g;
  return str.replace(regexp, "$1,");
}

const test = [1000, 3000000000, 1121121, "100000000.00"];

console.log(test.map(qianFenWei));
