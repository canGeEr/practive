// function fastSort(arr) {
//   const length = arr.length;
//   function dfs(begin, end) {
//     if(begin >= end) return
//     let left=begin, right=end;
//     // 右边空了
//     const target = arr[left];

//     while(left < right) {
//       while(left < right && arr[right] >= target) right--;
//       if(left < right) {
//         arr[left] = arr[right];
//         left++;
//       }
//       while(left < right && arr[left] < target) left++;
//       if(left < right) {
//         arr[right] = arr[left];
//         right--;
//       }
//     }
//     arr[left] = target;
//     dfs(begin, left - 1);
//     dfs(left + 1, end);
//   }
//   dfs(0, length - 1);
//   return arr
// }

/**
 *
 * @param {number []} arr
 * @param {number} k
 */
function fastSort(arr, k) {
  const length = arr.length;
  const lastIndex = length - k;
  /**
   *
   * @param {number} left
   * @param {number} right
   */
  function dfs(begin, end) {
    // 只剩下一个元素了
    if (begin >= end) return arr[begin];
    let comparisonValue = arr[begin];
    let left = begin,
      right = end;
    // 记得处理边界
    while (left < right) {
      // 直到从右边找到一个小于comparisonValue的值
      while (left < right && arr[right] >= comparisonValue) {
        right -= 1;
      }
      if (left < right) {
        arr[left] = arr[right];
        left += 1;
      }
      // 直到从左边找到一个
      while (left < right && arr[left] < comparisonValue) {
        left += 1;
      }
      if (left < right) {
        arr[right] = arr[left];
        right -= 1;
      }
    }
    arr[left] = comparisonValue;
    if (lastIndex === left) {
      return arr[left];
    }
    if (lastIndex < left) {
      return dfs(begin, left - 1);
    }
    return dfs(left + 1, end);
  }
  return dfs(0, length - 1);
}

const test = [
  [9, 8, 7, 7, 6, 5, 4, 3, 3, 3, 2, 1],
  [-20, 888, 77, 0, 100],
];

console.log(test.map(fastSort));
