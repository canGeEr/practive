/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
var compareVersion = function (version1, version2) {
  const version1List = version1.split(".");
  const version2List = version2.split(".");
  const length = Math.max(version1List.length, version2List.length);
  for (let i = 0; i < length; i++) {
    const dif = (version1List[i] || 0) - (version2List[i] || 0);
    if (dif > 0) {
      return 1;
    }
    if (dif < 0) {
      return -1;
    }
  }
  return 0;
};

const test = [
  ["1.01", "1.001"],
  ["1.0", "1.0.0"],
  ["0.1", "1.1"],
];

console.log(test.map((item) => compareVersion(...item)));

/**
 * 另外一种解法就是每次循环获取split
 */
