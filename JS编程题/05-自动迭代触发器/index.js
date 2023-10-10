function sleep(time) {
  return new Promise((fulfill) => setTimeout(fulfill, time * 1000, time));
}

const { log } = console;

function* generateFunc() {
  yield sleep(1);
  yield sleep(2);
  throw "dsadsa";
}

function co(generateFunc) {
  return function (...args) {
    const generate = generateFunc(...args);
    // 迭代器next抛出错误，被next函数捕获
    function next(res) {
      const result = generate.next(res);
      const value = Promise.resolve(result.value);
      if (result.done) return value;
      // 如果发生异常，终端递归调用，返回错误的代码
      return value.then((res) => next(res));
    }
    // 处理第一次调用next以外发生的错误
    return new Promise((fulfill, reject) => {
      try {
        fulfill(next());
      } catch (error) {
        reject(error);
      }
    });
  };
}

const result = co(generateFunc);

result()
  .then(log)
  .catch((error) => {
    console.log("error", error);
  });
