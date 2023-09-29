const { Element } = require("./packages/element");

/**
 *
 * @param {string} char
 */
function isText(char) {
  return char && !isTagToken(char) && char !== " ";
}

/**
 *
 * @param {string} s
 * @param {number} start
 */
function getTextToken(s, start) {
  const textCharArr = [s[start]];
  while (!isTagToken(s[start + 1])) {
    textCharArr.push(s[start + 1]);
    start += 1;
  }

  return { value: textCharArr.join("").trimEnd(), start };
}

/**
 *
 * @param {string} char
 */
function isTagToken(char) {
  return char && char === "<";
}

const attributeRegexp = /(\w+)(=\"(.*)\")?/;
/**
 *
 * @param {string} s
 * @param {number} start
 */
function getAttribute(s, start) {
  const charArr = [s[start]];
  // 假设都是 空格 / >
  while (![">", " "].includes(s[start + 1])) {
    charArr.push(s[start + 1]);
    start += 1;
  }
  const attributeStr = charArr.join("");
  // 匹配结果
  const [, name, , value] = attributeStr.match(attributeRegexp);
  return { name, value, start };
}

/**
 *
 * @param {string} s
 * @param {number} start
 */
function getTagToken(s, start) {
  const nextChar = s[start + 1];
  let isClose = false;
  // 当前是闭合标签，并且跳过闭合标签
  if (nextChar === "/") {
    isClose = true;
    start += 1;
  }
  const tagTokenCharArr = [];
  // 收集标签直到碰到 ' ' | '>'
  while (![" ", ">"].includes(s[start + 1])) {
    tagTokenCharArr.push(s[start + 1]);
    start += 1;
  }

  // 当前html标签有语法错误
  if (!tagTokenCharArr.length) {
    throw `在${start - 1}处标签有语法错误，找不到标签名称`;
  }

  const tagToken = tagTokenCharArr.join("");

  start += 1;

  // 闭合标签识别完标签名称直接退出
  if (isClose) {
    while (s[start] !== ">") {
      start += 1;
    }
    return { value: tagToken, start, isClose };
  }

  const attributes = {};
  // 非闭合标签需要继续识别属性，直到遇到 >
  while (s[start] !== ">") {
    const char = s[start];
    // 如果存在的话，一直找打
    if (char) {
      const result = getAttribute(s, start);
      attributes[result.name] = result.value;
      // 这里需要等待收集属性
      start = result.start;
    }
    start += 1;
  }

  return { value: tagToken, start, isClose, attributes };
}

/**
 *
 * @param {string} s
 */
function domParse(s) {
  let start = 0;
  const length = s.length;
  const domStack = [new Element("root")];
  while (start < length) {
    const char = s[start];
    // 标签
    if (isTagToken(char)) {
      const result = getTagToken(s, start);
      const { value, isClose, attributes } = result;
      // 当前是闭合标签
      if (isClose) {
        const topTagToken = domStack.at(-1).tag;
        if (topTagToken !== value) {
          throw "闭合标签未对应开始标签";
        }
        domStack.pop();
      } else {
        const topDom = domStack.at(-1);
        const currentDom = new Element(value, attributes);
        topDom.addChild(currentDom);
        domStack.push(currentDom);
      }
      start = result.start;
    }

    // 文字
    if (isText(char)) {
      const result = getTextToken(s, start);
      const { value } = result;
      if (value) {
        const topDom = domStack.at(-1);
        topDom.addChild(value);
      }
      start = result.start;
    }
    start += 1;
  }
  return domStack.at(-1).children;
}

module.exports = {
  domParse,
};
