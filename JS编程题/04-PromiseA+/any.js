const PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected";

function any(promises) {
  // 这里也需要处理非promise类型
  promises = Array.from(promises).map((promise) => Promise.resolve(promise));
  return new Promise((fulfill, reject) => {
    const length = promises.length;
    // 注意这里是拒绝
    if (!length) {
      return reject([]);
    }
    let successCount = 0;
    const result = [];
    // 这里必须记录index，因为then不是按照顺序调用的
    promises.forEach((promise, index) => {
      promise.then(
        (res) => {
          fulfill(res);
        },
        (error) => {
          result[index] = error;
          successCount++;
          successCount === length && reject(new AggregateError(result));
        }
      );
    });
  });
}

any([
  // Promise.resolve(33),
  // new Promise((resolve) => setTimeout(() => resolve(66), 3000)),
  // 99,
  Promise.reject(new Error("一个错误")),
  // new Promise((resolve, reject) => setTimeout(() => reject(99), 10000)),
]).then(
  (values) => console.log(values),
  (error) => {
    console.log("error", error);
  }
);
