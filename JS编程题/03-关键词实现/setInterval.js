function customSetInterval(
  callback,
  time,
  clearQuote = {
    id: undefined,
    clear() {
      clearTimeout(this.id);
    },
  }
) {
  clearQuote.id = setTimeout(() => {
    customSetInterval(callback, time, clearQuote);
    callback();
  }, time);
  return clearQuote;
}

let i = 0;

const manage = customSetInterval(() => {
  console.log(i);
  if (i === 5) {
    console.log("清除了");
    manage.clear();
  } else {
    i++;
  }
}, 1000);

// v2
// function setInterval(callback, time) {
//   const now = Date.now;
//   let startTime = endTime,
//     endTime = now();
//   const self = this;
//   function loop() {
//     self.timer = requestAnimationFrame(loop);
//     endTime = now();
//     if (endTime - startTime >= time) {
//       startTime = endTime = now();
//       callback();
//     }
//   }
//   self.timer = requestAnimationFrame(loop);
//   return this.timer;
// }
