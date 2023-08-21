/**
 *
 * @param {number} val
 */
function ListNode(val, next) {
  this.val = val;
  this.next = next || null;
}

ListNode.prototype.toString = function () {
  const res = [];
  let current = this;
  while (current) {
    res.push(current.val);
    current = current.next;
  }
  return res;
};

/**
 *
 * @param {number []} arr
 */
function buildLinkedList(arr) {
  const length = arr.length;
  const head = new ListNode("head");
  let current = head;
  for (let i = 0; i < length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head.next;
}

module.exports = {
  buildLinkedList,
  ListNode,
};
