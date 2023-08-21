function judgeType(variable) {
  if (variable === null) return false;
  if (typeof variable === "object" || typeof variable === "function")
    return true;
}

function judgeType(variable) {
  return variable instanceof Object;
}

function judgeType(variable) {
  // 然后排除下所有普通类型的构造函数
  return Object.prototype.toString.call(variable).slice(8, -1);
}
