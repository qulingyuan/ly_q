### Javascript
Javascript实现 = **核心(ECMAScript) + 文档对象模型(DOM) + 浏览器对象模型(BOM)**

- ECMAScript，由ECMA-262定义，提供核心语言功能;
- 文档对象模型(DOM)，提供访问和操作网页内容的方法和接口;
- 浏览器对象模型(BOM)，提供与浏览器交互的方法和接口。

### `<script>`元素

所有`<script>`元素都会按照它们在页面中出现的**先后顺序依次被解析**，在不使用defer和async属性的情况下，只有在解析完前 面`<script>`元素中的代码之后，才会开始解析后面`<script>`元素中的代码。

由于浏览器会先解析完不使用defer属性的`<script>`元素中的代码，然后再解析后面的内容，所以一般应该把`<script>`元素放在页面最后，即主要内容后面，`</body>`标签前面

##### `<script>`元素的属性：

- **async** : 可以表示当前脚本不必等待其他脚本，也不必阻塞文档呈现，不能保证异步脚本按照它们在页面中出现的顺序执行。异步脚本一定会在页面的load事件前执行，但可能会在DOMContentLoaded事件触发之前或之后执行。异步脚本不应该在加载期间修改DOM。
- **defer** : 文档完全被解析和显示之后再执行脚本，(不影响下载，只影响执行)；原则上，多个延迟脚本会按照在页面中出现的顺序执行，而且会在DOMContentLoaded事件触发前执行。
- crossorigin : 配置相关请求的 CORS(跨源资源共享)设置。默认不使用 CORS。crossorigin= "anonymous"配置文件请求不必设置凭据标志。crossorigin="use-credentials"设置凭据 标志，意味着出站请求会包含凭据。
- integrity : 允许比对接收到的资源和指定的加密签名以验证子资源完整性(SRI， 12 Subresource Integrity)。如果接收到的资源的签名与这个属性指定的签名不匹配，则页面会报错，脚本不会执行。这个属性可以用于确保内容分发网络(CDN，Content Delivery Network)不会提供恶意内容。
- src : 外部脚本文件，**可以跨域**
- charset : src指定的代码的字符集
- language : 脚本外部语言(已废弃，被type替代)
- type : language的替代属性，表示编写代码使用的脚本语言的内容类型(也称MIME类型)

##### 动态加载模式

javascript操作DOM的api实现动态加载，这种方式默认异步加载，相当于添加了 async 属性。

```javascript
let script = document.createElement('script');
script.src = 'gibberish.js';
script.async = false;	//并不是所有浏览器都支持async属性，所以可以统一设为同步加载
document.head.appendChild(script);
```

以这种方式获取的资源对浏览器预加载器是不可见的，会影响性能，如要避免，可在头部显示声明：

```javascript
<link rel="preload" href="gibberish.js">
```



##### 文档模式（IE5.5引入）

主要影响CSS内容的呈现，某些情况下也会影响javascript的解释执行。

- 混杂模式：让IE的行为与(包含 非标准特性的)IE5相同
- 标准模式：让IE的行为更接近标准行为

##### `<noscript>`元素：

`<noscript>`元素可以指定在不支持脚本或未开启脚本支持选项的浏览器中显示替代的内容。但在启用了脚本的情况下，浏览器不会显示`<noscript>`元素中的任何内容。
