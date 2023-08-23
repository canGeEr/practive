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
function reverseList(head) {
  let pre = null;
  let cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}

function reverseList(head) {
  if (!head || !head.next) return head;
  const tail = reverseList(head.next);
  head.next.next = head;
  head.next = null;
  return tail;
}

/**
 * 反转链表
 * 递归
 */
