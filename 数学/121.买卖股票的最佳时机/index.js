/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let minPrice = Number.MIN_VALUE;
  const maxProfit = 0;
  for (let price of prices) {
    if (minPrice > price) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minProfit;
    }
  }
  return maxProfit;
};
