/**
 * @param {number} n
 * @return {number}
 */
function climbStairs(n) {
  const arr = [1, 1];
  for (let i = 2; i <= n; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[n];
}

// 很消耗时间和空间
function climbStairs(n) {
  if (n <= 1) return 1;
  return climbStairs(n - 1) + climbStairs(n - 2);
}

// 全排列
function climbStairs(n, ans = [], paths = []) {
  const sum = paths.reduce((sum, value) => sum + value, 0);
  if (sum > n) return ans;
  if (sum === n) {
    return ans.push(paths);
  }
  climbStairs(n, ans, [...paths, 1]);
  climbStairs(n, ans, [...paths, 2]);

  return ans;
}

// 1836311903
const test = [2, 3, 4];

console.log(test.map((item) => climbStairs(item)));
