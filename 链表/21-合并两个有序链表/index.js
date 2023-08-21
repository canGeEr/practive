const { buildLinkedList, ListNode } = require("./../utils/link");

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  // 头结点
  const head = new ListNode("head");
  let current = head;
  while (list1 && list2) {
    if (list1.val > list2.val) {
      current.next = list2;
      list2 = list2.next;
    } else {
      current.next = list1;
      list1 = list1.next;
    }
    current = current.next;
  }
  current.next = list1 || list2;
  return head.next;
};

function mergeTwoLists(list1, list2) {
  if (list1 && list2) {
    if (list1.val > list2.val) {
      list2.next = mergeTwoLists(list1, list2.next);
      return list2;
    } else {
      list1.next = mergeTwoLists(list1.next, list2);
      return list1;
    }
  }
  return list1 || list2;
}

const test = [
  [buildLinkedList([1, 2, 4]), buildLinkedList([1, 3, 4])],
  [buildLinkedList([1, 2, 3, 4]), buildLinkedList([3, 4, 5, 6])],
  [buildLinkedList([1, 2, 3]), buildLinkedList([1, 2, 3])],
  [buildLinkedList([]), buildLinkedList([])],
  [buildLinkedList([]), buildLinkedList([0])],
];

console.log(test.map((item) => mergeTwoLists(...item)?.toString()));
