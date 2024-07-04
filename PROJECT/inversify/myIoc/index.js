// 类收集器
const keyConstructorMap = new Map();
const constructorKeyMap = new Map();
// 类依赖收集器
const dependConstructorMap = new Map();
// 类的单例收集
const instanceConstructorMap = new Map();

// todo 去重
export function injectable(key) {
    return function(_constructor) {
        keyConstructorMap.set(_constructor, key)
        constructorKeyMap.set(_constructor, key)
        return _constructor
    }
}

/**
 * 
 * @param {*} dependantConstructor 
 * @returns 修饰属性
 */
export function inject(dependantConstructor) {
    return function(_prototype, property, propertyDescriptor) {
        const dependentConstructor = _prototype.constructor
        // 没有的话创建一个
        const depend = dependConstructorMap.get(dependentConstructor) || []
        // 添加进入依赖项
        depend.push({
            constructor: dependantConstructor,
            property
        })
        // 尝试一个target => { a: A, b: B }
        dependentConstructor.set(dependentConstructor, depend)
    }
}

/**
 * 循环引用需要判断
 */
export class Container {
    static get(key) {
        const _constructor = keyConstructorMap.get(key)
        const depend = dependConstructorMap.get(_constructor)
        const instance = Reflect.construct(_constructor)
        instanceConstructorMap.set(_constructor, instance)
        depend.map(item => {
            const itemKey = constructorKeyMap.get(item.constructor)
            instance[item.property] = Container.get(itemKey)
        })
    }
}