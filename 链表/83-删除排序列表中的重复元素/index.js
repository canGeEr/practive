const { ListNode, buildLinkedList } = require("./../utils/link");
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
  const ans = new ListNode("start", head);
  let current = head;
  while (current) {
    let next = current.next;
    while (next && next.val === current.val) {
      next = next.next;
    }
    current.next = next;
    // 下一次和current不同的元素
    current = next;
  }
  return ans.next;
};

const test = [buildLinkedList([1, 1, 2]), buildLinkedList([1, 1, 2, 3, 3])];

console.log(test.map((item) => deleteDuplicates(item).toString()));
