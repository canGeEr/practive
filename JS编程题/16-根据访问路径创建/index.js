// 没有原型尽量存储
const source = {
  ownProperty: "ownProperty",
};

const ERROR_SYMBOL = Symbol.for("get object transaction error");

/**
 * 返回属性的最终对象，如果没有，那么创建，如果中间属性是非对象，那么需要返回null，并接触所有应用
 * @param {object} source
 * @param {string []} paths
 */
function deepGetTransaction(source, paths, begin = 0) {
  const length = paths.length;
  const pathPart = paths[begin];
  const isFinally = begin >= length - 1;
  if (isFinally) {
    return source[pathPart];
  }
  const value = source[pathPart];
  // 是否可访问，属性值存在，但是非可访问对象
  const denyAccess =
    pathPart in source &&
    (value === null ||
      value === undefined ||
      (typeof value !== "function" && typeof value !== "object"));
  if (denyAccess) return ERROR_SYMBOL;
  // 当前的value不可访问
  const needCreate = value === undefined;
  // 下一次迭代的source
  const nextSource = needCreate ? {} : value;
  // 先进行下一次迭代，获取到深度对象
  const transactionResult = deepGetTransaction(nextSource, paths, begin + 1);
  // 如果深度访问没有出问题，重新简历链接
  if (transactionResult !== ERROR_SYMBOL) {
    source[pathPart] = nextSource;
  }
  return transactionResult;
}

/**
 *
 * @param {object} source
 * @param {string} path
 * @param {*} value
 */
function deepSet(source, path, value) {
  const paths = path.split(".");
  let target = source;
  if (path.length >= 2) {
    // 确保读的所有路径创建
    deepGetTransaction(source, paths);
    target = deepGetTransaction(source, paths.slice(0, -1));
  }
  target[paths.at(-1)] = value;
}

const test = [
  ["待创建对象.待赋值属性", 1],
  ["a.b", 1],
  ["a.c", 2],
  ["a.d.e", 5],
  ["c", 3],
  ["待创建对象.待创建对象pro.待创建对象proMax", { 舒服了: "确实" }],
  ["a.d"],
  ["ownProperty.dsadsa"],
];

console.log(
  test.map((item) => {
    const propertyValue = deepSet(source, ...item);
    debugger;
  })
);
