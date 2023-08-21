const { gcd } = require("../../数学/1979-找出数组的最大公约数/index");

/**
 * @param {number[]} deck
 * @return {boolean}
 */
var hasGroupsSizeX = function (deck) {
  const map = {};
  const length = deck.length;
  for (let i = 0; i < length; i++) {
    map[deck[i]] = (map[deck[i]] || 0) + 1;
  }
  // 现在获取到了每张卡片的数量，求最小值，如果最小值小于2，直接退出，其余数字必须是最小值的倍数
  const sizeList = Object.values(map);

  const sizeLength = sizeList.length;
  if (sizeLength === 1) {
    if (sizeList[0] >= 2) return true;
    return false;
  }
  // 是否含有最小公因数
  let maxGcd = gcd(sizeList[0], sizeList[1]);
  for (let i = 2; i < sizeLength; i++) {
    maxGcd = Math.min(maxGcd, gcd(maxGcd, sizeList[i]));
  }
  console.log(sizeList, maxGcd);
  return maxGcd >= 2;
};

const test = [
  [1, 2, 3, 4, 4, 3, 2, 1],
  [1, 1, 1, 2, 2, 2, 3, 3],
  [1],
  [1, 1, 2, 2, 2, 2],
];

console.log(test.map(hasGroupsSizeX));
