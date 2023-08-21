const { buildLinkedList, ListNode } = require("../utils/link");

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/** 迭代
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function addTwoNumbers(l1, l2) {
  let l1C = l1,
    l2C = l2;
  let next = 0;
  let res = [];
  while (l1C || l2C) {
    const value = (l1C?.val || 0) + (l2C?.val || 0) + Number(next);
    const bit = value % 10;
    res.push(bit);
    next = (value - bit) / 10;
    l1C = l1C?.next;
    l2C = l2C?.next;
  }
  if (next) {
    res.push(1);
  }

  return buildLinkedList(res);
}

// 递归
function addTwoNumbers(l1, l2, next = 0) {
  if (!l1 && !l2) {
    if (next) return new ListNode(1);
    return null;
  }

  const value = (l1?.val || 0) + (l2?.val || 0) + Number(next);
  const bit = value % 10;

  return new ListNode(
    bit,
    addTwoNumbers(l1?.next, l2?.next, (value - bit) / 10)
  );
}

const test = [
  [
    [2, 4, 3],
    [5, 6, 4],
  ],
  [[0], [0]],
  [
    [9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9],
  ],
];

console.log(
  test.map((item) =>
    addTwoNumbers(...item.map((value) => buildLinkedList(value))).toString()
  )
);

/**
 * 考点，链表
 */
