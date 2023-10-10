// 展平数组

/**
 * @param {any[]} arr
 * @return {any[]}
 */
function flattenArr(arr) {
  const value = arr.map((item) =>
    Array.isArray(item) ? flattenArr(item) : item
  );
  return value.flat();
}

/**
 * @param {any[]} arr
 * @return {any[]}
 */
function flattenArr(arr) {
  return arr.reduce((result, next) => {
    return result.concat(Array.isArray(next) ? flattenArr(next) : next);
  }, []);
}

const test = [
  [1, [2, 3, [4, 5, 5, [7, 8, 9, 10]]], [11, 12], [13, 14]],
  ["dsa", "dsadsa1212", ["dsadsa"], ["dsadsa"], "1", ["2"]],
];

console.log(test.map(flattenArr));

/**
 * 考点
 * 1. 使用递归
 * 2. 变换打平方式
 */
