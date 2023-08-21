const { getInstanceConstructor } = require("../02-继承/getInstanceConstructor");

Function.prototype.customCall = function (instance) {
  const args = Array.from(arguments).slice(1);
  // 非严格模式下
  if (instance === null || instance === undefined) {
    instance = window;
  } else if (typeof instance !== "object" && typeof instance !== "function") {
    // 非对象的时候需要处理
    const Constructor = getInstanceConstructor(instance);
    instance = new Constructor(instance);
  }

  const callback = this;
  // 确保完全不会覆盖其他属性
  const tempKey = Symbol("temp");
  instance[tempKey] = callback;
  const result = instance[tempKey](...args);
  // 删除临时key
  delete instance[tempKey];
  // 注意需要返回结果
  return result;
};

Function.prototype.customApply = function (instance, args) {
  return this.call(instance, ...(args || []));
};

Function.prototype.customBind = function (instance, ...initArgs) {
  const that = this;
  return function (...args) {
    return that.call(instance, ...[].concat(initArgs, args));
  };
};

const instance = { name: "instance" };

function logName(...args) {
  return [this, ...args];
}

// console.log(logName.call(1));
// console.log(logName.customApply(1, [1, 2]));
const bindLogName = logName.customBind(instance, 1, 2);

console.log(bindLogName(3, 4));
