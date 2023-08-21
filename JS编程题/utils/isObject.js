function isObject(variable) {
  if (
    variable !== null &&
    (typeof variable === "object" || typeof variable === "function")
  ) {
    return true;
  }
  return false;
}

function getInstanceConstructor(instance) {
  return globalThis[Object.prototype.toString.call(instance).slice(8, -1)];
}

module.exports = {
  isObject,
  getInstanceConstructor,
};
