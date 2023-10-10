function curry(callback, ...outerArgs) {
  return function (...innerArgs) {
    const args = innerArgs.concat(outerArgs);
    if (callback.length <= args.length) {
      return callback.apply(this, args);
    }
    return curry(callback, ...args);
  };
}

/**
 *
 * @param  {...function} funArr
 */
function compose(...funArr) {
  return function (...args) {
    return funArr.reduceRight((lastArgs, callback) => {
      return [callback.apply(this, lastArgs)];
    }, args);
  };
}

/**
 *
 * @param  {...function} funArr
 */
function compose(...funArr) {
  return function (...args) {
    const length = funArr.length;
    function loop(begin) {
      if (begin >= length) return args;
      const callback = funArr[begin];
      return callback.call(this, loop(begin + 1));
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
compose(First, Second, Third)(1, 2, 3);
