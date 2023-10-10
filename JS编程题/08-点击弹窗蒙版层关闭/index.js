// 通过target ===
// 点击元素能否在paths上找到
const dialogContainer = document.getElementById("dialog-container");
const markContainer = document.getElementById("mark-container");
//
markContainer.addEventListener("click", () => {
  // 关闭弹窗
  console.log("点击了遮罩层");
});

dialogContainer.addEventListener("click", (event) => {
  //
  console.log("点击了遮罩层");
  event.stopPropagation();
});

window.addEventListener("click", (event) => {
  const { target } = event;
  if (dialogContainer.contains(target)) return;
  // 关闭弹窗
});
