/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isIsomorphic = function (s, t) {
  const map = {};
  const reverseMap = {};
  const length = s.length;
  for (let i = 0; i < length; i++) {
    const sValue = s[i],
      tValue = t[i];
    if (
      (map[sValue] && map[sValue] !== tValue) ||
      (reverseMap[tValue] && reverseMap[tValue] !== sValue)
    ) {
      return false;
    }
    map[sValue] = tValue;
    reverseMap[tValue] = sValue;
  }
  return true;
};

const test = [
  ["egg", "add"],
  ["foo", "bar"],
  ["paper", "title"],
];

console.log(test.map((item) => isIsomorphic(...item)));
