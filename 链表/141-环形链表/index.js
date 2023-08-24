/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  const map = new Map();
  let cur = head;
  while (cur && !map.has(cur)) {
    map.set(cur, true);
    cur = cur.next;
  }
  return map.has(cur);
};
