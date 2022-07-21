//链表节点定义
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
//创建链表函数
function buildLinkList(values) {
  return values.reverse().reduce((pre, cur) => new ListNode(cur, pre), null);
}

const linkedList = buildLinkList([1, 2, 3, 4, 5, 6]);
