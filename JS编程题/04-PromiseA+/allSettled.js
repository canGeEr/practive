const PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected";

function allSettled(promises) {
  // 这里也需要处理非promise类型
  promises = Array.from(promises).map((promise) => Promise.resolve(promise));
  return new Promise((fulfill) => {
    const length = promises.length;
    if (!length) {
      return fulfill([]);
    }
    let successCount = 0;
    const result = [];
    promises.forEach((promise, index) => {
      promise.then(
        (res) => {
          result[index] = {
            status: FULFILLED,
            value: res,
          };
          successCount++;
          length === successCount && fulfill(result);
        },
        (error) => {
          result[index] = {
            status: REJECTED,
            reason: error,
          };
          successCount++;
          length === successCount && fulfill(result);
        }
      );
    });
  });
}

allSettled([
  Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 3000)),
  99,
  Promise.reject(new Error("一个错误")),
  new Promise((resolve, reject) => setTimeout(() => reject(99), 10000)),
]).then((values) => console.log(values));
