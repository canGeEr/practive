const { ListNode, buildLinkedList } = require("../utils/link");

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  // 肯定需要新建pre节点
  // pre cur next
  // cur.next 存在，cur.val = cur.next.val => cur = cur.next
  // 直到找到.next.val不等于 cur.value，pre => cur.next
  const root = new ListNode("root", head);
  let pre = root,
    cur = head;
  while (cur & cur.next) {
    if (cur.val === cur.next.val) {
      // 找到第一个
      while (cur.val === cur.next.val) {
        cur = cur.next;
      }
      // 删除所有中间节点
      const next = cur.next;
      pre.next = next;
      // 重置所有指针
      cur = next;
    } else {
      // 重置所有指针
      pre = cur;
      cur = cur.next;
    }
  }

  return root.next;
};

const test = [
  buildLinkedList([1, 2, 3, 3, 4, 4, 5]),
  // buildLinkedList([1,1,1,2,3])
];

console.log(test.map(deleteDuplicates));
