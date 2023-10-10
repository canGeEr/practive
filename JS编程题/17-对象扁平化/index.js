/**
 *
 * @param {object} obj
 */
// function flattenObject(
//   variable,
//   flatObject = {},
//   preKeyArr = [],
//   cache = new Map()
// ) {
//   if (!isObject(variable)) return variable;
//   // 循环引用
//   if (cache.has(variable)) {
//     flatObject[preKeyArr.join(".")] = "loop";
//     return;
//   }
//   cache.set(variable, true);
//   // 继续去打平下一个key
//   Reflect.ownKeys(variable).forEach((key) => {
//     const value = variable[key];
//     preKeyArr.push(key);
//     if (isObject(value)) {
//       flattenObject(value, flatObject, preKeyArr, cache);
//     } else {
//       flatObject[preKeyArr.join(".")] = value;
//     }
//     preKeyArr.pop();
//   });
//   return flatObject;
// }

/**
 *
 * @param {any} variable
 */
function flattenObject(
  variable,
  cache = new Map(),
  paths = [],
  flatObject = {}
) {
  // 原始类型
  if (!isObject(variable)) {
    flatObject[paths.join(".")] = variable;
    return flatObject;
  }
  // 循环引用
  if (cache.has(variable)) return cache;
  cache.set(variable, true);
  // 遍历对象键值对
  Object.keys(variable).map((key) => {
    paths.push(key);
    flattenObject(variable[key], cache, paths, flatObject);
    paths.pop();
  });
  return flatObject;
}

function isObject(variable) {
  return (
    variable !== null &&
    (typeof variable === "object" || typeof variable === "function")
  );
}
const obj = {
  a: 1,
  b: [1, 2, { c: true }],
  c: { e: 2, f: 3 },
  g: null,
};

obj.z = { cicle: obj };

const test = [obj];

console.log(test.map((item) => flattenObject(item)));
