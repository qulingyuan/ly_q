### 什么是Event loop

首先，JS是单线程运行的，所以它的异步（setTimeout、ajax等）要基于回调来实现，而Event loop就是异步回调的实现原理。DOM事件也是用回调，基于Event loop，但DOM事件不是异步。

### JS如何执行

- 从前到后，一步一步执行
- 如果某一行执行报错，则停止下面代码的执行
- 先把同步代码执行完，再执行异步

### Event loop执行过程

同步代码，一行一行放在 Call Stack 执行，遇到异步，会先”记录“下（转送给Web APIs），等待时机（定时、网络请求等）。时机到了，就移动到Callback Queue。

如果 Call Stack 为空（即同步代码执行完）Event loop 开始工作。轮询查找 Callback Queue，若有则移动到Call Stack 执行。然后继续轮询查找。

#### 举个例子：

```javascript
console.log("hi");

setTimeout(function cb1(){
    console.log("cb1"); //cb 即 callback
},5000);

console.log("bye");
```

#### 代码执行过程：

1. 执行第一行代码，`console.log("hi")`被推入 Callback Stack，执行完之后控制台打印出"hi"，然后清空 Callback Stack。
2. 执行第二行代码，然后 setTimeout 被推入 Callback Stack，setTimeout 不属于 ES6，它属于浏览器定义的一个函数，所以Callback Stack会把setTimeout交给Web APIs处理，Web APIs会把 setTimeout 的第一个参数 cb1 函数放到定时器里面，等待5秒钟之后将 cb1 放入Callback Queue中。
3. 执行第三行代码，打印出”bye“，所有的同步代码被执行完，Callback Stack 清空。所以Event loop启动，Event loop不断循环 Callback Queue。等5秒钟Web APIs执行完后，cb 被放入Callback Queue时，Event loop把 cb1 放到 Callback Stack里面，执行并打印出"cb1"。代码执行结束。

### DOM 事件和 Event loop

DOM事件也是用回调，基于Event loop，但DOM事件不是异步。与异步的区别是，DOM事件是执行了鼠标点击等动作后回调函数才会执行。

```html
    <button id="btn1">提交</button>
    <script>
        console.log("hi");
        $("#btn1").click(function(e){
            console.log("button clicked");
        })
        console.log("bye");
    </script>
```

