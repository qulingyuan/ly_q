function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

function buildLinkList(values) {
  return values.reverse().reduce((acc, val) => new ListNode(val, acc), null);
}

// ---- Generate our linked list ----
const linkedList = buildLinkList([1, 4, 3, 2, 5, 2]);

var partition = function (head, x) {
  let dummy1 = new ListNode(-1);
  let dummy2 = new ListNode(-1);
  let p1 = dummy1;
  let p2 = dummy2;
  let p = head;
  while (p !== null) {
    if (p.val < x) {
      p1.next = p;
      p1 = p1.next;
    } else {
      p2.next = p;
      p2 = p2.next;
    }

    p = p.next;
  }
  p2.next = null;
  p1.next = dummy2.next;
  return dummy1.next;
};
partition(linkedList, 3);
