// 调用一次之后，其他的调用都得看时间，不得超过
function throttle(callback, time) {
  let start = new Date();
  return function (...args) {
    const end = new Date();
    if (end - start >= time) {
      start = end;
      callback(...args);
    }
  };
}
