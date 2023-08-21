const PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected";

function race(promises) {
  // 这里也需要处理非promise类型
  promises = Array.from(promises).map((promise) => Promise.resolve(promise));
  return new Promise((fulfill, reject) => {
    for (let promise of promises) {
      promise.then(fulfill, reject);
    }
  });
}

race([
  // Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 3000)),
  // 99,
  // Promise.reject(new Error("一个错误")),
  new Promise((resolve, reject) => setTimeout(() => reject(99), 2000)),
]).then(
  (values) => console.log(values),
  (error) => {
    console.log("error", error);
  }
);
