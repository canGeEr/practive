// 进阶，任意n进制字符串求和

function add(front, end, radix) {
  if (radix < 2) {
    throw "最小是2进制";
  }
  if (radix > 10) {
    throw "最大是10进制";
  }
  if (radix === 10) {
    return Number(front) + Number(end);
  }
}
