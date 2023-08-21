/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  const length = nums.length;
  let i = 0,
    j = length - 1;
  while (i < j) {
    // 非目标元素跳过
    if (nums[i] !== val) {
      i++;
      continue;
    }
    if (nums[j] === val) {
      j--;
      continue;
    }
    nums[i] = nums[j];
    nums[j] = val;
    i++;
    j--;
  }

  return nums[i] === val ? i : i + 1;
};

const test = [
  [[3, 2, 2, 3], 3],
  [[0, 1, 2, 2, 3, 0, 4, 2], 2],
  [[4, 5], 4],
];

console.log(test.map((item) => removeElement(...item)));
