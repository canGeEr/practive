const { instanceOf } = require("./instanceOf");

// 组合
// function Animal(name) {
//   this.name = name;
// }

// function Dog(name, greet) {
//   Animal.call(this, name);
//   this.greet = greet;
// }

// 组合式 关联原型链
// Dog.prototype = new Animal();
// Dog.prototype.construct = Dog;

// 组合寄生
// Dog.prototype = Object.create(Animal.prototype, {
//   construct: {
//     value: Dog,
//     enumerable: false,
//     writable: true,
//     configurable: true,
//   },
// });

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
