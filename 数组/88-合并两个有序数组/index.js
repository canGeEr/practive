/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
  const length = m + n;
  let count = 0,
    i = m - 1,
    j = n - 1;
  while (i >= 0 && j >= 0) {
    const iValue = nums1[i];
    const jValue = nums2[j];
    if (iValue >= jValue) {
      nums1[length - 1 - count] = iValue;
      i--;
    } else {
      nums1[length - 1 - count] = jValue;
      j--;
    }
    count++;
  }
  if (j < 0) return nums1;
  // 直接把n复制到m上
  for (let k = 0; k <= j; k++) {
    nums1[k] = nums2[k];
  }
  return nums1;
};

const test = [
  [[1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3],
  [[1], 1, [], 0],
  [[0], 0, [1], 1],
];

console.log(test.map((item) => merge(...item)));
