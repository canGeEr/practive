// n个请求是并发的
const sleep = require("./../utils/sleep");

const length = 4;

const asyncArr = new Array(length).fill(0).map((_, index) => {
  return () => sleep(length - index - 1);
});

// 按顺序执行
Promise.resolveByOrder = function (asyncTaskList) {
  asyncTaskList = Array.from(asyncTaskList);
  const length = asyncTaskList.length;
  let prePromise = null;
  const resultCache = [];

  const fulfill = (res, i) => {
    resultCache[i] = res;
    console.log(i, "完成了");
    return res;
  };

  const logFulFill = (i) => console.log(resultCache[i]);

  for (let i = 0; i < length; i++) {
    const cachePrePromise = prePromise;
    const promise = asyncArr[i]();
    if (!cachePrePromise) {
      prePromise = promise
        .then((res) => fulfill(res, i))
        .then(() => logFulFill(i));
    } else {
      // 依赖之前的promise
      prePromise = promise
        .then((res) => fulfill(res, i))
        .then(() => {
          console.log("等待", i - 1);
          return cachePrePromise;
        })
        .then(() => logFulFill(i));
    }
  }
};

Promise.resolveByOrder(asyncArr);
