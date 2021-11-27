//基本类型
let bool: boolean = true;
let num: number|undefined|null = 123;
let str: string = 'abc';

//数组
let arr1: number[] = [1, 2, 3];
let arr2: Array<number | string> = [1, 2, 3, '4'];

//元组
let tuple: [number, string] = [0, "1"];
// tuple.push(3);
// console.log(tuple);
// tuple[2];

//函数
let add = (x: number, y: number): number => x + y;
let compute:(x:number,y:number)=>number;
compute = (a,b)=>a+b;

//对象
let obj:{x:number,y:number} = {x:1,y:2};
obj.x = 3;

//symbol
let s1:symbol= Symbol();
let s2 = Symbol();
// console.log(s1 === s2);

//undefined, null
let un :undefined = undefined;
let nu:null=null;
num = undefined;
num = null;

//void 表示没有任何返回值的函数，让任何表达式返回undefined。
let noReturn = ()=>{}

//any
let x;
x = 1;
x = 'a';

//never 永远不会有返回值的类型。如抛出error的函数和死循环函数
let error = ()=>{
    throw new Error('error');
}
let endless = ()=>{
    while(true){}
}

interface StringArray{
    [index:number]:string
}

let array :StringArray=['sre','yi']

interface Names {
    [x: string]: string;
  }
const name :Names={
    me:'ett',
}