/**
 *
 * @param {function} callback
 * @param {number} time
 */
function throttle(callback, time) {
  let startTime = new Date();
  return function (...args) {
    const endTime = new Date();
    if (endTime - startTime >= time) {
      callback.apply(this, args);
      startTime = endTime;
    }
  };
}

// 一种是时间控制，记录上一次的调用时间

module.exports = {
  throttle,
};
