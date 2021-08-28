let mySet = new Set();
//添加元素
mySet.add(1);
mySet.add(5);
mySet.add(5);
mySet.add("some text");
//重复添加元素，只保留一个；数值相同的对象仍可重复添加，因为对比的是引用。
let obj1 = { a: 1, b: 2 };
mySet.add(obj1);
mySet.add({ a: 1, b: 2 });
//判断是否包含元素
const has = mySet.has(obj1);
//删除元素
mySet.delete(5);

//Set的keys和values是一样的，所以有以下遍历方法
for (const item of mySet) console.log(item);
for (const item of mySet.keys()) console.log(item);
for (const item of mySet.values()) console.log(item);
for (const [key, value] of mySet.entries()) console.log(key, value);

//Set -> Array
const myArr1 = [...mySet];
const myArr2 = Array.from(mySet);

//Array -> Set
const mySet2 = new Set([1, 2, 3, 4]);

//求交集
const intersection = new Set([...myset].filter((item) => mySet2.has(item)));
//求差集
const difference = new Set([...myset].filter((item) => !mySet2.has(item)));