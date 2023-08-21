/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let k = 0;
  const length = nums.length;
  for (let i = 0; i < length; i++) {
    if (i && nums[i] === nums[i - 1]) {
      continue;
    }
    nums[k] = nums[i];
    k++;
  }
  return k;
};

// 删除有序数组的重复项，并改变nums的前k个值为n
const test = [
  [1, 1, 2],
  [0, 0, 1, 1, 1, 2, 2, 3, 3, 4],
];

console.log(test.map(removeDuplicates));
