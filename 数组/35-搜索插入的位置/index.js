/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
function searchInsert(nums, target) {
  const length = nums.length;
  let left = 0;
  let right = length - 1;
  while (left < right) {
    const middle = Math.floor((left + right) / 2);
    if (nums[middle] === target) {
      return middle;
    } else if (nums[middle] > target) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }
  return left + (nums[left] < target ? 1 : 0);
}

// function searchInsert(nums, target) {
//   function search(left, right, target) {
//     if (left >= right) {
//       return left;
//     }
//     const middle = Math.floor((left + right) / 2);
//     if (nums[middle] === target) return middle;
//     else if (nums[middle] < target) {
//       return search(left, right + 1, target);
//     } else {
//       return search(left + 1, right, target);
//     }
//   }
//   const foundIndex = search(0, nums.left - 1, target);
//   if (nums[foundIndex] === target || nums[foundIndex] > target)
//     return foundIndex;
//   return foundIndex + 1;
// }

const test = [
  [[1, 3, 5, 6], 5],
  [[1, 3, 5, 6], 2],
  [[1, 3, 5, 6], 7],
];

console.log(test.map((item) => searchInsert(...item)));

/**
 * 考点
 * 二分法、递归
 */
