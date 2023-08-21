function getInstanceConstructor(instance) {
  return globalThis[Object.prototype.toString.call(instance).slice(8, -1)];
}

module.exports = {
  getInstanceConstructor,
};
