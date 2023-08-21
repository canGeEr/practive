function instanceOf(classConstructor) {
  const classPrototype = classConstructor.prototype;
  let prototype = Object.getPrototypeOf(this);

  while (prototype) {
    if (prototype === classPrototype) return true;
    prototype = Object.getPrototypeOf(prototype);
  }

  return false;
}

module.exports = {
  instanceOf,
};

// class Animal {}

// class Dog extends Animal {}

// const dog = new Dog();

// console.log(instanceOf);

// console.log(
//   instanceOf.call(dog, Dog),
//   instanceOf.call(dog, Animal),
//   instanceOf.call(dog, Object)
// );
