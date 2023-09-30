/**
 *
 * @param {number []} arr
 */
function heapSort(arr) {
  // 先建最大堆
  buildMaxHeap(arr);
  // 最大堆的特性是第一个元素已经是最大值
  // 考虑每次获取最大值之后，把新元素给到0，然后进行下滤从下排序
  const length = arr.length;
  for (let i = length - 1; i > 0; i--) {
    swap(arr, 0, i);
    // 下一次的堆，长度会减一
    heapify(arr, 0, i);
  }
  return arr;
}

/**
 *
 * @param {number []} arr
 */
function buildMaxHeap(arr) {
  const length = arr.length;
  // 由于是二叉树，先把下层的小堆稳定，再逐层增加一个堆定，再进行下滤
  // 找到当前数组的最后一个值的父节点
  // n - 1，(i - 1) / 2
  for (let i = Math.floor(length / 2 - 1); i >= 0; i--) {
    heapify(arr, i, length);
  }

  return arr;
}

/**
 *
 * @param {number []} arr
 * @param {number} i
 * @param {number} length
 */
function heapify(arr, i, length) {
  const left = 2 * i + 1,
    right = left + 1;
  let maxValueIndex = i;
  [left, right].forEach((index) => {
    if (index < length && arr[maxValueIndex] < arr[index]) {
      maxValueIndex = index;
    }
  });
  if (maxValueIndex !== i) {
    // 交换
    swap(arr, maxValueIndex, i);
    // 交换的子节点需要继续下滤
    heapify(arr, maxValueIndex, length);
  }
}

function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

const test = [
  [0, 1, 2, 3, 4],
  // [4, 3, 2, 0, 1]
  [3, 4, 5, 6, 1, 7, 8],
  // [8, 6, 7, 4, 1, 3, 5]
];

console.log(test.map(heapSort));
