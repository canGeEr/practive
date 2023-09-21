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
  return (...args) => {
    function loop(begin) {
      if (begin >= funArr.length) {
        return args;
      }
      // 拿到当前的函数
      const callback = funArr[begin];
      return [callback(...loop(begin + 1))];
    }
    return loop(0);
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
