const { isObject } = require("../utils/isObject");

function shallowClone(obj) {
  // 如果是原始类型，直接返回
  if (!isObject(obj)) return obj;
  return assign({}, obj);
}

function assign(target, source) {
  for (let key in source) {
    if (!source.hasOwnProperty(key)) continue;
    target[key] = source[key];
  }
  return target;
}

const test = [
  {
    a: 1,
  },
];

console.log(test.map((item) => shallowClone(item) === item));
