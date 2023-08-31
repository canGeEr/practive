// 把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。

// 给你一个可能存在 重复 元素值的数组 numbers ，它原来是一个升序排列的数组，并按上述情形进行了一次旋转。请返回旋转数组的最小元素。例如，数组 [3,4,5,1,2] 为 [1,2,3,4,5] 的一次旋转，该数组的最小值为 1。

// 注意，数组 [a[0], a[1], a[2], ..., a[n-1]] 旋转一次 的结果为数组 [a[n-1], a[0], a[1], a[2], ..., a[n-2]] 。

// 示例 1：

// 输入：numbers = [3,4,5,1,2]
// 输出：1
// 示例 2：

// 输入：numbers = [2,2,2,0,1]
// 输出：0

// 提示：

// n == numbers.length
// 1 <= n <= 5000
// -5000 <= numbers[i] <= 5000
// numbers 原来是一个升序排序的数组，并进行了 1 至 n 次旋转

// 找到某个地方非升序了
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
  // 找到第一个非升序的数值
  const length = numbers.length;
  let left = 0,
    right = length - 1;
  while (left < right) {
    const middle = Math.floor((left + right) / 2);
    // right属于小值
    if (numbers[middle] < numbers[right]) {
      right = middle;
    } else if (numbers[middle] === numbers[right]) {
      right--;
    } else {
      // 这里才是真的，left > numbers[right]，这里在逼近
      left = middle + 1;
    }
  }
  return numbers[left];
};

const test = [
  [3, 4, 5, 1, 2],
  [2, 2, 2, 0, 1],
  [3, 1, 1],
];

// 右边所有只一定比左边大的
// left right => middle，如果midele > left，说明还没逼近 left = middel + 1
// 如果 middle < left，说明middle已经在左边了，right = middle - 1
// 如果middle > righ，说明在偏左，否则偏右

// left   right
// 比Left都打，那比所有大，是在偏左，left middle + 1
// 比right都笑，那笔所有小，在偏右，right middle - 1
// 比left小，但是right大，也是偏左，left middle + 1

console.log(test.map(minArray));
// 找到一个能代替他的嘴
