/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 1,
      right = n,
      ans = 1;
    while (left <= right) {
      const middle = Math.floor((right + left) / 2);
      if (isBadVersion(middle)) {
        ans = middle;
        right = middle - 1;
      } else {
        left = middle + 1;
      }
    }
    return ans;
  };
};

// 其他的普通遍历会超时
