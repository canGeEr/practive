const { buildLinkedList, ListNode } = require("./../utils/link");

function reorderList(head) {
  const ans = [];
  let cur = head;
  // 遍历链表放进ans里
  while (cur) {
    const next = cur.next;
    cur.next = null;
    ans.push(cur);
    cur = next;
  }
  // 开始按照顺序串联起来所有的节点
  let left = 0,
    right = ans.length - 1;
  // 节点尾部
  let pre = new ListNode("pre");
  while (left <= right) {
    // 上一个节点末尾指向当前节点
    pre.next = ans[left];
    if (left === right) break;
    ans[left].next = ans[right];
    // 指针位置重置
    pre = ans[right];
    left++;
    right--;
  }

  return head;
}

const test = [buildLinkedList([1, 2, 3, 4]), buildLinkedList([1, 2, 3, 4, 5])];

console.log(test.map((item) => reorderList(item).toString()));
