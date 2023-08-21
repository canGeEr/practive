/**
 * 1. 浏览器下次执行重绘的时候，调用只能得更新函数
 * 2. 当tab切换到后台或者隐藏tab是，requestAnimationFrame自动暂停，不会频繁调用，节省电池寿命
 * 3. 通常是60s/次，基于浏览器的刷新率调度回调函数的执行，以确保动画和渲染的流畅性和高性能
 */

Object.addEvent(() => {
  if (!done) {
    window.requestAnimationFrame(() => {
      // 执行函数
      done = false;
    });
  }
});
