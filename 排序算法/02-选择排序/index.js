function selectSort(nums) {
  const length = nums.length;
  let temp;
  // 第一层已经有n个排好序，直到n-1排序完成
  for (let i = 0; i <= length - 2; i++) {
    let maxIndex = 0;
    for (let j = 1; j <= length - 1 - i; j++) {
      if (nums[maxIndex] < nums[j]) {
        maxIndex = j;
      }
    }
    // 当前maxi和最大值换位
    temp = nums[length - 1 - i];
    nums[length - 1 - i] = nums[maxIndex];
    nums[maxIndex] = temp;
  }
  return nums;
}

const test = [
  [9, 8, 7, 6, 5, 4, 3, 2, 1],
  [100, 0, 20, -10, 50],
];

// flag 提前跳出
console.log(test.map(selectSort));
