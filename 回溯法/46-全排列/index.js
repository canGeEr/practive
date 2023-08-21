/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function permute(nums) {
  const collection = [];
  function loop(nums, arr, collection, cache) {
    if (arr.length === nums.length) {
      return collection.push(arr);
    }
    for (let i = 0; i < nums.length; i++) {
      const currentNum = nums[i];
      // 如果还未放入过该数字，递归遍历
      if (!cache[currentNum]) {
        cache[currentNum] = 1;
        loop(nums, arr.concat(nums[i]), collection, cache);
        cache[currentNum] = 0;
      }
    }
  }
  const cache = nums.reduce((map, value) => {
    map[value] = 0;
    return map;
  }, {});
  loop(nums, [], collection, cache);
  return collection;
}

const test = [[1, 2, 3], [0, 1], [1]];

console.log(test.map(permute));
