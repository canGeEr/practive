/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b);
  const length = nums.length;

  const res = [];
  for (let first = 0; first <= length - 3; first++) {
    const firstValue = nums[first];
    if (firstValue === nums[first - 1]) {
      continue;
    }
    // 这里肯定满足条件
    let second = first + 1;
    let third = length - 1;
    while (second < third) {
      if (second > first + 1 && nums[second - 1] === nums[second]) {
        second += 1;
        continue;
      }
      if (third < length - 1 && nums[third + 1] === nums[third]) {
        third -= 1;
        continue;
      }
      if (nums[third] + nums[second] + firstValue === 0) {
        res.push([firstValue, nums[third], nums[second]]);
        second += 1;
        third -= 1;
      } else if (nums[third] + nums[second] + firstValue < 0) {
        second += 1;
      } else {
        third -= 1;
      }
    }
  }

  return res;
};

const test = [
  [-1, 0, 1, 2, -1, -4],
  [0, 0, 0],
  [-2, 0, 1, 1, 2],
];

console.log(test.map((item) => threeSum(item)));
