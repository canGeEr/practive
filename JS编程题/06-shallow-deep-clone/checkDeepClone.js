const { isObject, getInstanceConstructor } = require("../utils/isObject");
const deepClone = require("./deepClone");
const data = require("../../树/深度遍历和广度遍历/test.json");

/**
 *
 * @param {*} source
 * @param {*} copy
 * @param {*} map
 * @returns 检测两个对象是否
 */
function checkDeepClone(source, copy, map = new Map()) {
  const sourceType = isObject(source);
  const copyType = isObject(copy);
  // 非对象需要判断是否值相等
  if (!sourceType && !copyType) {
    return source === copy;
  }
  // 一个是对象，另外一个不是对象；两个对象相等
  if ((!sourceType && copyType) || (!copyType && sourceType) || source === copy)
    return false;

  // 如果存在循环引用的时候，需要同时存在
  const sourceHasReference = map.has(source);
  const copyHasReference = map.has(copy);
  if (
    (sourceHasReference && !copyHasReference) ||
    (copyHasReference && !sourceHasReference)
  ) {
    return false;
  }
  if (sourceHasReference && copyHasReference) return true;
  map.set(source, true);
  map.set(copy, true);
  // 只有每个属性都检测需要true，才能返回true
  return Reflect.ownKeys(source).every((key) => {
    return checkDeepClone(source[key], copy[key], map);
  });
}

console.log(
  data.map((source, index) => {
    const copy = deepClone(source);
    if (index) {
      source.isSource = true;
    }
    // copy.isCopy = true;
    return checkDeepClone(source, copy);
  })
);
