/**
 *
 * @param {string} name
 */
function getCookie(name) {
  // 获取当前的cookie
  const cookie = document.cookie;
  const cookieStrItemArr = cookie.split("; ");
  const result = cookieStrItemArr.reduce((result, cookieStrItem) => {
    const [key, value] = cookieStrItem.split("=");
    result[key] = decodeURIComponent(value);
    return result;
  }, {});
  return result[name];
}

/**
 *
 * @param {string} name
 */
function getCookie(name) {
  // 获取当前的cookie
  const cookie = document.cookie;
  const regexp = new RegExp(`${name}=([^;]+)`);
  return cookie.match(regexp)[1];
}

const document = {
  cookie: `sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%22shepijcanwu%22%2C%22first_id%22%3A%2218ad6e347d6b5b-04b0b4ebb3de01c-19525634-2073600-18ad6e347d71a98%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2218ad6e347d6b5b-04b0b4ebb3de01c-19525634-2073600-18ad6e347d71a98%22%7D; _ga=GA1.1.927508666.1696475108; git_locale=en; _ga_2RJ45ZPERV=GS1.1.1696749299.3.1.1696749676.0.0.0; km_uid=shepijcanwu; XSRF-TOKEN=f90ff8fa-2a1d-46bd-b937-cb605909b880; collapsed_nav=false`,
};

console.log(getCookie("km_uid"));
