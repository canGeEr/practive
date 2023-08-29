/**
 *
 * @param {number[][]} wall
 */
function leastBricks(wall) {
  const height = wall.length;
  // 收集每层的断点在哪里
  const map = {};
  for (let layer of wall) {
    const length = layer.length;
    let sum = 0;
    for (let i = 0; i < length - 1; i++) {
      sum += layer[i];
      // 不需要计算那么清楚，只需要每层同频就可
      if (map[sum] === undefined) {
        map[sum] = 0;
      }
      map[sum] += 1;
    }
  }
  // 注意Math.max的调用，如果没有只会返回Infixxx
  return height - Math.max(0, ...Object.values(map));
}
