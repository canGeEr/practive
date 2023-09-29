// function bubbleSort(nums) {
//   const length = nums.length;
//   let temp;
//   // 第一层已经有n个排序好了，直到 length - 1都排序号了需要退出
//   for (let i = 0; i <= length - 2; i++) {
//     let sortFinish = true;
//     // 从 0 => length - 1 - i转移最大值过去
//     for (let j = 0; j <= length - 2 - i; j++) {
//       if (nums[j + 1] < nums[j]) {
//         sortFinish = false;
//         // 下一个比当前大，交换
//         temp = nums[j];
//         nums[j] = nums[j + 1];
//         nums[j + 1] = temp;
//       }
//     }
//     if (sortFinish) return nums;
//   }

//   return nums;
// }

/**
 *
 * @param {number []} arr
 */
function bubbleSort(arr) {
  const length = arr.length;
  for (let i = 0; i < length - 1; i++) {
    for (let j = 0; j < length - 1; j++) {
      // j 和 j + 1交换比较并交换
      if (j + 1 + i >= length) break;
      // 把大的值往后移动
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const test = [
  [9, 8, 7, 6, 5, 4, 3, 2, 1],
  [100, 0, 20, -10, 50],
];

// flag 提前跳出
console.log(test.map(bubbleSort));
