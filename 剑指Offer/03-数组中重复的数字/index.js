/**
 *
 * @param {string []} nums
 */
function findRepeatNumber(nums) {
  const length = nums.length;
  const arr = [];
  for (let i = 0; i < length; i++) {
    const value = nums[i];
    if (arr[value]) return value;
    arr[value] = 1;
  }
}

function findRepeatNumber(nums) {
  const length = nums.length;
  const map = new Map();
  for (let i = 0; i < length; i++) {
    const value = nums[i];
    if (map.has(value)) return value;
    map.set(value, true);
  }
}

const test = [[2, 3, 1, 0, 2, 5, 3]];

console.log(test.map(findRepeatNumber));

/**
 * 考点
 * 1. 过滤法
 * 2. 哈希法
 */
