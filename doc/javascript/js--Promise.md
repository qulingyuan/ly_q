### Promise状态

pending---->fulfilled

pending---->rejected

Promise 是基于 then 和 catch 的链式调用，但也是基于回调函数。

> **不管是 then 还是 catch，只要没有报错，则返回 resolved，里面有报错则返回 rejected。**
>
> **resolved 触发后续 then 回调**
>
> **rejected 触发后续 catch 回调**
>
> pending 状态，不会触发 then 和 catch 回调

note:只关注是否报错即可。

then 正常返回 resolved，里面有报错则返回 rejected。

```javascript
const p1 = Promise.resolve().then(()=>{
    return 100;
})
console.log("p1",p1); //fulfilled 触发后续 then 回调
p1.then(()=>{
    console.log("123");
})
const p2 = Promise.resolve().then(()=>{
    throw new Error("then error");
})
console.log("p2",p2); // rejected 触发后续 catch 回调
p2.then(()=>{console.log("456")}).catch(err=>{
    console.error("err100",err)
})
```

catch 正常返回 resolved，里面有报错则返回 rejected。

```javascript
const p3 = Promise.reject("my error").catch(err=>{
    console.error(err);
})
console.log("p3",p3); //fulfilled 注意！！！ 触发 then 回调
p3.then(()=>{
    console.log(100);
})
const p4 = Promise.reject("my error").catch(err=>{
    throw new Error("catch err");
})
console.log("p4",p4); //rejected 触发 catch 回调
p4.then(()=>{
    console.log(200); //不会打印
}).catch(()=>{
    console.log("some err");
})//fulfilled
```

下面用几道题来巩固一下：

第一题

```javascript
Promise.resolve().then(() => {
    console.log(1)
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
}) //fulfilled
```

运行结果：

> 1
> 3

第二题

```javascript
Promise.resolve().then(() => {
    console.log(1)
    throw new Error('erro1')
}).catch(() => {
    console.log(2)
}).then(() => {
    console.log(3)
})
```

运行结果：

> 1
> 2
> 3

第三题

```javascript
Promise.resolve().then(() => {
    console.log(1)
    throw new Error('erro1')
}).catch(() => {
    console.log(2)
}).catch(() => { // 注意这里是 catch
    console.log(3)
})//reject
```

运行结果：

> 1
> 2