function sleep(time) {
  return new Promise((fulfill) => setTimeout(fulfill, time * 1000, time));
}

module.exports = sleep;
