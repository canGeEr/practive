const ListNode = require("./ListNode");
/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  // 维护Mao保证映射
  this.map = new Map();
  this.capacity = capacity;
  this.head = new ListNode("key", "head");
  this.tail = new ListNode("key", "tail", this.head);
  this.head.next = this.tail;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1;
  const node = this.map.get(key);
  this.removeNode(node);
  this.appendToHead(node);
  return node.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  let node = null;
  // 覆盖
  if (this.map.has(key)) {
    node = this.map.get(key);
    node.value = value;
    // 前一个指向后一个
    this.removeNode(node);
    this.appendToHead(node);
    return;
  }
  // 创建
  node = new ListNode(key, value);
  // 需要插入到头部
  this.appendToHead(node);
  this.map.set(key, node);
  // 溢出，删除
  if (this.capacity < this.map.size) {
    const deleteNode = this.tail.pre;
    // 需要删除尾部节点
    this.map.delete(deleteNode.key);
    this.removeNode(deleteNode);
  }
};

LRUCache.prototype.removeNode = function (node) {
  node.pre.next = node.next;
  node.next.pre = node.pre;
};

LRUCache.prototype.appendToHead = function (node) {
  node.next = this.head.next;
  node.next.pre = node;
  this.head.next = node;
  node.pre = this.head;
};

const lRUCache = new LRUCache(1);
lRUCache.put(2, 1); // 缓存是 {1=1}
lRUCache.get(2); // 缓存是 {1=1, 2=2}
// lRUCache.put(3, 2);

// lRUCache.get(1); // 返回 1
// lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
// lRUCache.get(2); // 返回 -1 (未找到)
// lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
// lRUCache.get(1); // 返回 -1 (未找到)
// lRUCache.get(3); // 返回 3
// lRUCache.get(4); // 返回 4

/**
 * 考点，题目要求使用O<1>，那基本就考虑链表了和hashmap，数组一般是O<n>
 * 前后都有节点防止意外的空节点
 */
