// 遍历
const map = {
  sex: "man",
  year: 21,
};

// 遍历
Object.keys(map);
Object.values(map);
Object.entries();
Object.fromEntries(map);

// 原型 prototype
Object.getPrototypeOf(map);
Object.setPrototypeOf(map, null);
Object.create(map);
Object.prototype.isPrototypeOf(map);

// 属性 property
Object.defineProperty;
Object.defineProperties;
Object.getOwnPropertyNames(map);
Object.getOwnPropertySymbols(map);
Object.getOwnPropertyDescriptor(map, "dsad");
Object.getOwnPropertyDescriptors(map);
Object.prototype.hasOwnProperty("dsadsa");
Object.prototype.propertyIsEnumerable("dasdsa");

// 控制拓展性
Object.preventExtensions(map);
Object.isExtensible(); // 不允许新增新属性

// 密封，不允许修改现有属性的配置，但是可以修改属性的值
Object.seal();
Object.isSealed();

// 冻结属性的值
Object.freeze();
Object.isFrozen();
