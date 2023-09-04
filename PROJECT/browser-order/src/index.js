// import "./index.css";
// import _ from "lodash";

// function component() {
//   const element = document.createElement("div");

//   // Lodash, currently included via a script, is required for this line to work
//   element.innerHTML = _.join(["Hello", "webpack"], " ");

//   return element;
// }

// document.body.appendChild(component());

function DOMContentLoaded() {
  console.log("文档加载完成");
}

window.addEventListener("DOMContentLoaded", DOMContentLoaded);

// 实现一个react需要什么？，能执行react的环境js，能够识别jsx的语法label
