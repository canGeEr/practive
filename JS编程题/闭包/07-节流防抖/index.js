function debounce(callback, time) {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, args);
    }, time);
  };
}
