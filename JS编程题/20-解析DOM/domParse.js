/**
 *
 * @param {string} s
 */
function domParse(s) {}

class Element {
  constructor(tag, ...children) {
    this.tag = tag;
    this.children = children || [];
  }

  addChild(element) {
    this.children.push(element);
  }
}

function createElementByToken(token) {
  return new Element(token);
}

/**
 *
 * @param {string} domStr
 * @returns
 */
function parse(domStr) {
  const tokenStack = [""];
  const domStack = [new Element("root")];
  let begin = 0;
  const { length } = domStr;
  // 开始解析收集
  while (begin < length) {
    const char = domStr[begin];
    // 开标签，说明需要开始匹配了
    if (char === "<") {
      const { tagToken, isClose } = getTagToken();
      dealTagToken(tagToken, isClose);
      begin += 1;
      continue;
    }
    const textToken = getTextToken(char);
    dealTextToken(textToken);
    begin += 1;
  }

  function getTagToken() {
    const tokenCharArr = [];
    const attributesArr = [];
    let isClose = false;
    // 下一个字符是否安全
    while (domStr[begin + 1] !== ">") {
      if (begin >= length) throw "标签<未匹配到>";
      begin += 1;
      const nextChar = domStr[begin];
      // 如果是空字符直接过滤
      if (!nextChar) continue;
      // 如果发现是闭合标签跳过不收集
      if (nextChar === "/") {
        isClose = true;
        continue;
      }
      tokenCharArr.push(nextChar);
    }
    // 跳过 > 符号
    begin += 1;
    // 前后的空字符串去掉
    const tagToken = tokenCharArr.join("").trim();
    return { tagToken, isClose };
  }

  /**
   *
   * @param {string} char
   */
  function getTextToken(char) {
    const textTokenArr = [char];
    // 只要不遇到开箭头
    while (domStr[begin + 1] !== "<" && begin < length) {
      begin += 1;
      const nextChar = domStr[begin];
      textTokenArr.push(nextChar);
    }
    return textTokenArr.join("").trim();
  }

  /**
   *
   * @param {string} tagToken
   * @param {boolean} isClose
   */
  function dealTagToken(tagToken, isClose) {
    // 上一级的root
    const root = domStack.at(-1);
    if (isClose) {
      // 说明当前是正常弹出
      if (tagToken === tokenStack.at(-1)) {
        tokenStack.pop();
        domStack.pop();
        return;
      } else {
        throw "dom标签匹配失败";
      }
    }
    tokenStack.push(tagToken);
    const element = createElementByToken(tagToken);
    domStack.push(element);
    // 新创建的element加入dom树
    if (root) {
      root.addChild(element);
    }
  }

  function dealTextToken(textToken) {
    // 上一级的root
    const root = domStack.at(-1);
    root.addChild(textToken);
  }

  return domStack[0];
}

module.exports = {
  domParse,
};
