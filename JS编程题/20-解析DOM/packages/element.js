/**
 * Element 是 AST语法树的抽象
 */
class Element {
  constructor(tag, attributes, children) {
    this.tag = tag;
    this.attributes = attributes || {};
    this.children = children || [];
  }

  addChild(element) {
    this.children.push(element);
  }

  addAttribute(name, value) {
    this.attributes[name] = value;
  }
}

module.exports = {
  Element,
};
