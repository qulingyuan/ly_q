### async/await的基本使用

异步回调 callback hell

Promise 是基于 then catch 的链式调用，但也是基于回调函数

async/await 是同步语法，彻底消灭回调函数。



执行await，外层必须要用一个async进行包裹。

await后面可以追加Promise对象，也可以追加async函数执行。



### async/await 和 Promise 的关系

async/await 是消灭异步调用的终极武器，但和Promise并不互斥，二者相辅相成。

> 执行async函数，返回的是Promise对象。
>
> await相当于Promise的then。
>
> async/await中try...catch可捕获异常，代替了Promise的catch。



执行async函数，返回的是Promise对象。如果直接返回值，会封装成一个Promise对象返回，如果返回一个Promise对象，则直接返回。

await相当于Promise的then。如果后面跟的是一个值，则会封装成一个Promise对象返回，如果跟一个Promise对象，则直接返回。但await处理不了catch。

### 异步的本质

