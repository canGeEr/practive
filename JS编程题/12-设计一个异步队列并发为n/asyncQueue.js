const sleep = require("./../utils/sleep");

class AsyncQueue {
  constructor() {
    this.cache = new Map();
  }
  tap(name, fn) {
    if (!this.cache.has(name)) {
      this.cache.set(name, []);
    }
    this.cache.get(name).push(fn);
  }
  exec(name, fn) {
    const list = this.cache.get(name);
    if (!list?.length) return fn();
    const currentFun = list.shift();
    return currentFun(() => this.exec(name, fn));
  }
}

async function fn1(cb) {
  console.log("fn1 start");
  await sleep(0);
  await cb();
  console.log("fn1 end");
}

async function fn2(cb) {
  await sleep(1);
  console.log("fn2 start");
  await cb();
  console.log("fn2 end");
}

async function fn3(cb) {
  await sleep(2);
  console.log("fn3 start");
  await cb();
  console.log("fn3 end");
}

async function fn4(cb) {
  await sleep(3);
  console.log("fn4 start");
  await cb();
  console.log("fn4 end");
}

const asyncQueue = new AsyncQueue();
// 注册事件队列
asyncQueue.tap("init", fn1);
asyncQueue.tap("init", fn2);
asyncQueue.tap("init", fn3);
asyncQueue.tap("init", fn4);

// 执行事件队列
asyncQueue
  .exec("init", () => {
    console.log("所有异步任务完成一半");
  })
  .then((res) => {
    console.log("所有异步任务完全执行完成");
  });

/**
 * 通过制作下一步回调完成，还需要考虑是不是一定需要pop
 */
