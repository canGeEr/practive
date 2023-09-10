function curry(fn, ...initArgs) {
  const length = fn.length;
  return function (...args) {
    const currentArgs = initArgs.concat(args);
    if (currentArgs.length === length) {
      return fn(...currentArgs);
    }
    return curry(fn, ...currentArgs);
  };
}

function compose(...funArr) {
  return (...args) => {
    const [result] = funArr.reduceRight((params, callback) => {
      return [callback.apply(null, params)];
    }, args);
    return result;
  };
}

function compose(...funArr) {
  return function loop(...args) {
    // 第一个函数拿出来
    const callback = funArr.shift();
    if (!funArr.length) {
      return callback(...args);
    }
    return callback(loop(...args));
  };
}
const First = (...argus) => {
  console.log(argus);
  console.log("First");
};

const Second = () => {
  console.log("Second");
};

const Third = () => {
  console.log("Third");
};

console.log({
  a: compose(Third, Second, First),
});

compose(Third, Second, First)(1, 2, 3);
