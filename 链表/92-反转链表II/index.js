const { ListNode, buildLinkedList } = require("../utils/link");

var reverseBetween = function (head, left, right) {
  // 当元素长度为2，left=1, right = 2的时候，链表被反转
  const root = new ListNode("root", head); // leftNode 前面的一个节点
  let pre = root; // 开始获取快慢指针
  for (let i = 1; i < left; i++) {
    pre = pre.next;
  } // 获取当前左节点
  let leftNode = pre.next,
    rightNode = pre.next; // 左节点向前走n步
  for (let i = 1; i <= right - left; i++) {
    rightNode = rightNode.next;
  }
  const tail = rightNode.next; // 现在找到左右节点了，需要反转左右节点，先断开连接
  pre.next = null;
  rightNode.next = null;
  reverselist(leftNode);
  pre.next = rightNode;
  leftNode.next = tail;
  return root.next;
};

// 这里是反转链表算法
function reverselist(head) {
  let pre = null,
    cur = head;
  while (cur) {
    const next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}

const test = [
  [buildLinkedList([1, 2, 3, 4, 5]), 2, 4],
  [buildLinkedList([5]), 1, 1],
];

console.log(test.map((item) => reverseBetween(...item).toString()));
