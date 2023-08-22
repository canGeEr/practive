/**
 * @param {number[]} nums
 * @return {number}
 */
function maxSubArray(nums) {
  const length = nums.length;
  let max;
  for (let i = 0; i < length; i++) {
    let sum = 0;
    for (let j = i; j < length; j++) {
      sum += nums[j];
      if (max === undefined) max = sum;
      else max = Math.max(max, sum);
    }
  }
  return max;
}

function maxSubArray(nums) {
  let pre = 0,
    max = 0;
  const length = nums.length;
  for (let i = 0; i < length; i++) {
    pre = Math.max(nums[i], pre + nums[i]);
    max = Math.max(max, pre);
  }
  return max;
}

const test = [[-2, 1, -3, 4, -1, 2, 1, -5, 4], [1], [5, 4, -1, 7, 8]];

console.log(test.map(maxSubArray));

/**
 * 动态规划
 * 分治法
 */
