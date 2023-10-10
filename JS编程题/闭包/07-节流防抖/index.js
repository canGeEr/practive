const { debounce } = require("./debounce");
const { throttle } = require("./throttle");

function callback() {
  console.log("触发callback");
}

function runInterval(callback) {
  let count = 20 * 5;
  let timer = setInterval(() => {
    count--;
    // 频繁调用
    callback();
    // callback();
    if (count <= 0) {
      clearInterval(timer);
    }
  }, 50);
}

function runDebounce() {
  const debounceCallback = debounce(callback, 120);
  runInterval(debounceCallback);
}

function runThrottle() {
  const throttleCallback = throttle(callback, 1000);
  runInterval(throttleCallback);
}

// runDebounce();
runThrottle();
