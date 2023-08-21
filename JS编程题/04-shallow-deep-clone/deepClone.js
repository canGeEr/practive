const { isObject, getInstanceConstructor } = require("../utils/isObject");
const test = require("../../树/深度遍历和广度遍历/test.json");

function deepClone(obj, cache = new Map()) {
  // 非对象直接返回
  if (!isObject(obj) || typeof obj === "function") {
    return obj;
  }
  // 存在循环引用
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  let copy = Object.create(Object.getPrototypeOf(obj));
  // 获取对应的构造函数
  const Constructor = getInstanceConstructor(obj);
  if (Constructor === RegExp) {
    copy = new RegExp(obj);
  } else if (Constructor === Date) {
    copy = new Date(obj);
  } else if (Constructor === Array) {
    copy = new Array(obj.length);
  }
  cache.set(obj, copy);
  // 如何拷贝函数
  Reflect.ownKeys(obj).map((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key);
    Object.defineProperty(copy, key, {
      writable: true,
      enumerable: true,
      configurable: true,
      value: deepClone(obj[key], cache),
      ...descriptor,
    });
  });

  return copy;
}

console.log(
  test.map((item) => {
    const result = deepClone(item);
    return result;
  })
);
