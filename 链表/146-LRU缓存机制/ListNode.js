function ListNode(key, value, pre, next) {
  this.key = key;
  this.value = value;
  this.pre = pre || null;
  this.next = next || null;
}

ListNode.prototype.toString = function () {
  const res = [];
  let current = this;
  while (current) {
    res.push(current.val);
    current = current.next;
  }
  return res.join(" => ");
};

module.exports = ListNode;
