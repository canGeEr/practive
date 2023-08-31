var CQueue = function () {
  // 把一个队列看成两段，前一段需要翻过来，逆序out数组
  // 后一段为in，正序数组
  this.left = [];
  this.right = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.right.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  // 折叠部分没有值，需要把right继续折叠
  if (!this.left.length) {
    // right没有任何值，说明数组空了
    if (!this.right.length) return -1;
    this.foldQueue();
  }
  return this.left.pop();
};

CQueue.prototype.foldQueue = function () {
  while (this.right.length) {
    this.left.push(this.right.pop());
  }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */

// 两个栈实现一个队列

const cQueue = new CQueue();

console.log(cQueue.deleteHead());
cQueue.appendTail("5");
cQueue.appendTail("2");
console.log(new Array(2).fill(0).map(() => cQueue.deleteHead()));
