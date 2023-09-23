class Dog {
  constructor() {
    this.name = "哈士奇";
  }

  @debounce(600)
  greet() {
    console.log("你好呀，我是" + this.name);
  }
}

function _debounce(callback, t) {
  let timer = null;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      console.log("执行了");
      callback.apply(this, args);
    }, t);
  };
}

function debounce(t) {
  return function (target, name, descriptor) {
    const callback = descriptor.value;
    descriptor.value = _debounce(callback, t);
    return descriptor;
  };
}

const dog = new Dog();

console.log(dog);

dog.greet();
setTimeout(() => {
  dog.greet();
}, 60);
