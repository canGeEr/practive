// const object = (() => {
//   let index = 0;
//   return {
//     next() {
//       return { done: false, value: index++ };
//     },
//   };
// })();

// const generateIterator = function () {
//   return object;
// };

// for (let value of { [Symbol.iterator]: generateIterator }) {
//   console.log(value);
// }

Object.prototype[Symbol.iterator] = function* () {
  const keys = Object.keys(this);
  for (let key of keys) {
    yield [key, this[key]];
  }
};

for (let value of { a: 1, b: 2 }) {
  console.log(value);
}
