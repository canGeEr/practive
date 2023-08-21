/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

const { ListNode, buildLinkedList } = require("../utils/link");

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  // 头结点
  const res = new ListNode("head", head);
  let current = res;
  let pre, suf;
  // 每次后面有两个元素
  while (current.next && current.next.next) {
    pre = current.next;
    suf = pre.next;
    pre.next = suf.next;
    suf.next = pre;
    current.next = suf;
    current = pre;
  }

  return res.next;
};

function swapPairs(head) {
  if (!head.next || head.next.next) return head;
  const next = head.next;
  // 后续的也是交换过的
  head.next = swapPairs(next.next);
  next.next = head;
  return next;
}

const test = [
  buildLinkedList([1, 2, 3, 4]),
  buildLinkedList([]),
  buildLinkedList([1]),
  buildLinkedList([4, 5, 6, 7, 8]),
];

console.log(test.map((item) => swapPairs(item)));

/**
 * 考点，链表的迭代和递归
 */
