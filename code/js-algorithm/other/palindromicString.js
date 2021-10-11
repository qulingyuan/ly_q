
function palindromicString(input){
    if(typeof input !== "string") return false;
    return input.split("").reverse().join("") === input;
}

console.log(palindromicString(""));

function levelTrace_1(root) {
    let p = root;
    const stack = [[p,1]];
    const res = [];
    const result = [];
    while(stack.length>0){
      const [n,i] = stack.pop();
      res.push(n);
      if(i%2===1){
        result = [...result,...res];
      }else{
        result = [...result,...res.reverse()]
      }
      res = [];
      if(n.left) stack.push(n.left,i+1);
      if(n.right) stack.push(n.right,i+1);
    }
    return result;
  }
  function TreeNode () {
    let val;
    let left;
    let right;
  }
  for(let i=0; i<3; i++){
    console.log('hello world')
  }
  
  function levelTrace(root) {
    let p = root;
    const stack = [p];
    const res = [];
    while(stack.length>0){
      const n = stack.pop();
      res.push(n);
      if(p.left) stack.push(p.left);
      if(p.right) stack.push(p.right);
    }
    return res;
  }
  