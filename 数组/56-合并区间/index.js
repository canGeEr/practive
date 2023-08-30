/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  const length = intervals.length;
  if (length === 1) return [...intervals];
  // 根据第一个元素排序
  intervals.sort((a, b) => a[0] - b[0]);
  const mergeArr = [intervals[0]];
  for (let i = 1; i < length; i++) {
    // 偏右值
    const left = mergeArr.at(-1);
    // 偏左值
    const right = intervals[i];
    // 条件允许才能合并
    if (left[1] >= right[0]) {
      // 直接修改右端点的值
      left[1] = Math.max(right[1], left[1]);
    } else {
      mergeArr.push(intervals[i]);
    }
  }

  return mergeArr;
};

// 合并区间

const test = [
  [
    [1, 4],
    [2, 3],
  ],
  [
    [15, 18],
    [1, 3],
    [2, 6],
    [8, 10],
  ],
  [
    [1, 4],
    [4, 5],
  ],
];

console.log(test.map(merge));
