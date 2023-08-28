const { isObject, getInstanceConstructor } = require("../utils/isObject");
// const test = require("../../树/深度遍历和广度遍历/test.json");

function deepClone(obj, cache = new Map()) {
  // 非对象直接返回
  if (!isObject(obj) || typeof obj === "function") {
    return obj;
  }
  // 存在循环引用
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  let copy = null;
  // 获取对应的构造函数
  const Constructor = obj.constructor;
  if ([RegExp, Date, Map, Set].includes(Constructor)) {
    copy = new Constructor(obj);
  } else if (Constructor === Array) {
    copy = new Array();
  } else {
    copy = Object.create(Object.getPrototypeOf(obj));
  }
  cache.set(obj, copy);
  // 如何拷贝函数
  Reflect.ownKeys(obj).map((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    const { enumerable, configurable } = descriptor;
    Object.defineProperty(copy, key, {
      writable: true,
      enumerable,
      configurable,
      value: deepClone(obj[key], cache),
    });
  });

  return copy;
}

// const test = [
//   {
//     a: new Map([[0, 1]]),
//   },
// ];

// test[0].b = test[0];

// console.log(
//   test.map((item) => {
//     const result = deepClone(item);
//     console.log(result, item);
//     result.cicle = item;
//     return result;
//   })
// );

module.exports = deepClone;
