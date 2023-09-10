class EventEmit {
  constructor() {
    this.cache = new Map();
  }
  on(name, callback) {
    if (!this.cache.has(name)) {
      this.cache.set(name, []);
    }
    this.cache.get(name).push(callback);
    return this;
  }

  off(name, callback) {
    const callbackList = this.cache.get(name);
    if (!callbackList?.length) return;
    const callbackIndex = callbackList.findIndex((item) => callback === item);
    if (callbackIndex === -1) return;
    callbackList.splice(callbackIndex, 1);
  }

  once(name, callback) {
    const wrapCallback = (...args) => {
      callback(...args);
      off.call(this);
    }

    function off() {
      this.off(name, wrapCallback);
    }

    this.on(name, wrapCallback);
    return off;
  }

  emit(name, ...args) {
    const callbackList = this.cache.get(name);
    if (!callbackList?.length) return;
    callbackList.forEach((callback) => callback(...args));
  }
}

const eventEmit = new EventEmit();

eventEmit.on("fuck", first1);

function first1() {
  console.log("first1");
}

function first2() {
  eventEmit.off('fuck', first1)
  console.log("first2");
}

function first3() {
  console.log("first3");
}

function first4() {
  console.log("first4");
}

eventEmit.once("fuck", first2);

eventEmit.on("fuck", first3);
eventEmit.on("fuck", first4);

eventEmit.emit("fuck");
eventEmit.emit("fuck");
