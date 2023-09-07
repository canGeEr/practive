function add(...args) {
  return args.reduce((sum, value) => sum + value);
}

module.exports = add;