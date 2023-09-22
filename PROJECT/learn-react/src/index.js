class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

function log(target, name, description) {
  console.log(target, name, description);
}

const math = new Math();

console.log(math.add(1, 2));
