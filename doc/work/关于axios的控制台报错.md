### Bug事项

切换tab时，控制台有时候会出现如下错误：

![axios控制台报错](https://github.com/qulingyuan/ly_q/blob/fcc5fc1374f0bb0c6e5c7cd74b1572a3014ae05f/doc/media/project_axios_error_1.png)

### 原因分析

报错信息描述的非常清楚，就是我们在unmounted组件内更改了state。具体的话，就是tab页面切换过快时，第一个tab页面内的请求还没有返回，但是tab已经切到别的页面了。等到请求返回后，第一个tab页面组件已经被卸载了，此时根据请求去修改其state，必然会报错。

### 解决方案

如果组件已经被卸载了，就取消组件卸载前已经发送出去的axios请求。

在useEffect里，一共有两个与请求有关的数据，一个是直接发送的axios请求获取到的数据，另一个是从上层组件的axios请求返回的数据往下层组件传回来的结果。二者都会导致控制台报错。

针对第一个问题，直接利用[axios cancelToken](https://github.com/axios/axios#cancellation)取消请求即可，官方给了两种处理方式，一是使用CancelToken的静态方法，另一种是自己实例化一个CancelToken对象，二者道理都是一样的，只不过第二种可以自定义注入的参数；第二个问题，利用一个变量控制setState，使其不在组件卸载时执行。这里我们的变量使用`useRef`来定义，

![axios解决方案](https://github.com/qulingyuan/ly_q/blob/fcc5fc1374f0bb0c6e5c7cd74b1572a3014ae05f/doc/media/project_axios_error_2.png)

