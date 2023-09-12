function fastSort(arr) {
  const length = arr.length;
  function dfs(begin, end) {
    if(begin >= end) return
    let left=begin, right=end;
    // 右边空了
    const target = arr[left];

    while(left < right) {
      while(left < right && arr[right] >= target) right--;
      if(left < right) {
        arr[left] = arr[right];
        left++;
      }
      while(left < right && arr[left] < target) left++;
      if(left < right) {
        arr[right] = arr[left];
        right--;
      }
    }
    arr[left] = target;
    dfs(begin, left - 1);
    dfs(left + 1, end);
  }
  dfs(0, length - 1);
  return arr
}


const test = [
  [9, 8, 7, 7, 6, 5, 4, 3, 3, 3, 2, 1],
  [-20, 888, 77, 0, 100]
]

console.log(test.map(fastSort))