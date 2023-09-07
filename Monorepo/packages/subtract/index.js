function subtract(...args) {
  return args.reduce((last, next) => {
    return last - next;
  });
}

module.exports = subtract;