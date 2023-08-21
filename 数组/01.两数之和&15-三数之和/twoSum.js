const test = [
  // [-1, 0, 1, 2, -1, -4],
  [0, 1, 2, -1, -4],
  [-1, -1, 0, 1, 1],
  // [1, 2, -1, -4],
  // [2, -1, -4],
  // [-1, -4],
];

// 两数之和

// [-4, -1, -1, 0 ,1 ,2]
function twoSum(nums) {
  const res = [];
  nums.sort((a, b) => a - b);
  // 排序后
  let i = 0;
  j = nums.length - 1;
  while (i < j) {
    if (i > 0 && nums[i - 1] === nums[i]) {
      i++;
      continue;
    }
    if (j < nums.length - 1 && nums[j + 1] === nums[i]) {
      j--;
      continue;
    }
    // 只有用过，并确认它没用才能跳过
    const distance = nums[i] + nums[j];
    if (distance === 0) {
      res.push([nums[i], nums[j]]);
      i++;
      j--;
    } else if (distance > 0) {
      j--;
    } else {
      i++;
    }
  }
  return res;
}

console.log(test.map((item) => twoSum(item)));
