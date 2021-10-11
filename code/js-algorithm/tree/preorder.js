const bt = require("./bt");
//递归版
const preorder = (root) => {
  if (!root) return;
  console.log(root.val);
  preorder(root.left);
  preorder(root.right);
};

//非递归版
const preorder_1 = (root) => {
  if (!root) return;
  const stack = [root];
  while (stack.length) {
    const n = stack.pop();
    console.log(n.val);
    if (n.right) stack.push(n.right); //必须写在前面，因为栈的后进先出的特性
    if (n.left) stack.push(n.left);
  }
};


const pre = (root) => {
  if (!root) return;
  const stack = [root];
  while (stack.length > 0) {
    const n = stack.pop();
    console.log(n.val);
    n.right && stack.push(n.right);
    n.left && stack.push(n.left);
  }
};
pre(bt);
