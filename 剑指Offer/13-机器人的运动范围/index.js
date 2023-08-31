// /**
//  * @param {number} m
//  * @param {number} n
//  * @param {number} k
//  * @return {number}
//  */
// var movingCount = function (m, n, k) {
//   let sum = 0;
//   for (let i = 0; i < m; i++) {
//     const sub = k - calcNumberBitSum(i);
//     // const max = n - 1 + 9;
//     // // 当前这层能表示的最大数值也小于sub
//     // if (max < sub) {
//     //   sum += n;
//     //   continue;
//     // }
//     for (let j = 0; j < n; j++) {
//       if (calcNumberBitSum(j) <= sub) sum++;
//     }
//   }

//   return sum;
// };

// /**
//  *
//  * @param {number} nub
//  */
// function calcNumberBitSum(nub) {
//   let sum = 0;
//   while (nub) {
//     const bit = nub % 10;
//     sum += bit;
//     nub = (nub - bit) / 10;
//   }
//   return sum;
// }

// // m行 n列，范围是[m-1, n-1]
// // k，坐标的位数和不能大于18

// // m = 2, n = 3, k = 1
// // 3

// // m = 3, n = 1, k = 0
// // 1

// const test = [
//   [2, 3, 1],
//   [3, 1, 0],
// ];

// console.log(test.map((item) => movingCount(...item)));
// 没写出来
