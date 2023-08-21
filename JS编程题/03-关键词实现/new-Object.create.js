// 原型对象，一个是对象描述
function objectCreate(instance, descriptors) {
  // 判断是否为object
  if (!instance) {
    return Object.setPrototypeOf({}, null);
  }
  const ConstructorFun = new Function();
  ConstructorFun.prototype = instance;
  ConstructorFun.prototype.constructor = ConstructorFun;
  const result = new ConstructorFun();
  delete ConstructorFun.prototype.constructor;
  Object.defineProperties(result, descriptors || {});
  return result;
}

function test() {
  const value = objectCreate({ a: 1 });

  console.log(value.a, Object.getPrototypeOf(value));
}

test();

/**
 *
 * @param {function} Constructor
 * @returns
 */
function createNew(Constructor, ...args) {
  const instance = Object.create(Constructor.prototype);
  const result = Constructor.call(instance, ...args);
  return result instanceof Object ? result : instance;
}
