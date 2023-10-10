function ajax(url, option = {}) {
  url = option.url || url;
  const { method, params, query, onSuccess, onFail, headers, withCredentials } =
    option;
  const xhr = new XMLHttpRequest();
  // 设置请求头
  Object.keys(headers).map((header) => {
    xhr.setRequestHeader(header, headers[header]);
  });
  // 是否携带凭证信息
  xhr.withCredentials = withCredentials;
  // 先添加时间监听
  xhr.addEventListener("readystatechange", function () {
    const { readyState, status, responseText } = xhr;
    if (readyState !== 4) return;
    if (status === 200) {
      onSuccess(JSON.parse(responseText));
    } else {
      onFail(xhr);
    }
  });
  // 初始化方法，是否异步
  xhr.open(method, url, true);
  // 真正发送请求到服务端
  xhr.send(params instanceof FormData ? params : serialize(params));
}

function serialize(params) {
  return Object.keys(params)
    .reduce((result, key) => {
      result.push(`${key}=${encodeURIComponent(params[key])}`);
      return result;
    }, [])
    .join("&");
}
