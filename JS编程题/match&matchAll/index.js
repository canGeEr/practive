/**
 *
 * @param {string} str
 */
function match(str) {
  const regexp = /\s(\w+)\s/;
  console.log(str.match(regexp));
  console.log(regexp.exec(str));
  return true;
}

const test = [
  "The Caterpillar and Alice looked at each other",
  // "dsdsa This image has a resolution of 1440×900 pixels.",
];

console.log(test.map(match));
