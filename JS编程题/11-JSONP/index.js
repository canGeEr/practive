function jsonP(url, options = {}) {
  const { onSuccess, onFail, params = {} } = options;
  // 像express直接内置jsonp方法，识别query的callback
  const callback = `jsonp_${new Date().getTime()}`;
  url = generateUrl(url, {
    ...params,
    callback,
  });
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = url;
  // 挂载回调函数到window上
  Object.defineProperty(window, callback, {
    value: (res) => {
      onSuccess?.(res);
      clear();
    },
    writable: false,
    enumerable: false,
    configurable: true,
  });
  script.onerror = function (event) {
    onFail?.(event);
    clear();
  };
  // 插入开始生效
  document.body.appendChild(script);

  function clear() {
    document.body.removeChild(script);
    delete window[callback];
  }
}

function generateUrl(url, params) {
  const urlParser = new URL(url);
  const { searchParams } = urlParser;
  for (let key of Object.keys(params)) {
    searchParams.append(key, params[key]);
  }
  return urlParser.toString();
}

jsonP("http://localhost:3000/jsonp?a=1", {
  onFail(error) {
    console.log(error);
  },
  onSuccess(res) {
    console.log(res);
  },
  params: {
    username: "shepijcanwu",
  },
});
