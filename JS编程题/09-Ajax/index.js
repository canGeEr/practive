const xhr = new XMLHttpRequest();
// 设置请求头
xhr.setRequestHeader("Content-type", "application/json");
// 确认开启异步
xhr.open("get", "url", true);
// 是否携带cookie
xhr.withCredentials = true;
// 尽量在发送时间前挂载好监听事件
xhr.onreadystatechange = (event) => {
  const { readyState, status, responseText } = xhr;
  if (!(readyState === 4 && status === 200)) return;
  console.log(responseText);
};
// 发送数据，注意之类是否需要序列化, encodeURLComponent
xhr.send();
