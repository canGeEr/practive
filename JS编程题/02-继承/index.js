const { instanceOf } = require("./instanceOf");

// 组合
function Animal(type) {
  this.type = type
}

function Dog(type) {
  Animal.call(this, type);
  this.eat = function() {
    console.log('Dog eat')
  }
}

Dog.prototype = Object.create(Animal.prototype, {
  constructor: {
    value: Dog,
    enumerable: false,
    writeable: true,
    configurable: true,
  }
});

class Animal {
  name;
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  greet;
  constructor(name, greet) {
    super(name);
    this.greet = greet;
  }
}

console.log(instanceOf.call(new Dog(), Animal));
