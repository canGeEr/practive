/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;
  const length = s.length;
  const map = {};
  for (let i = 0; i < length; i++) {
    map[s[i]] = (map[s[i]] || 0) + 1;
    map[t[i]] = (map[t[i]] || 0) - 1;
  }

  return Object.values(map).every((item) => !item);
};

const test = [
  ["anagram", "nagaram"],
  ["rat", "car"],
];

console.log(test.map((item) => isAnagram(...item)));
