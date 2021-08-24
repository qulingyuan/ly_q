### DOM

DOM本质就是一棵树。

### DOM节点操作

获取DOM节点

```javascript
const div1 = document.getElementById('div1'); //	元素
const divList = document.getElementsByTagName('div') // 集合 HTMLCollection
const containerList = document.getElementsByClassName('container') // 集合 HTMLCollection
const pList = document.querySelectorAll('p');  //NodeList
```

### property 和attribute

property 和 attribute二者都可能引起DOM重新渲染。

使用建议：尽量用property去操作。因为attribute一定会重新渲染，而property有可能避免重新渲染。

property：修改对象属性，不会体现到 html 结构中。

```javascript
const pList = document.querySelectorAll('p');
const p1 = pList[0];
// property 形式
console.log( p1.style.width ); // 通过style获取样式
p1.style.width = '100px'; // 修改样式
console.log( p1.className ); // 获取 class
p1.className = 'red'; // 修改 class
console.log(p1.nodeName) //标签名称
console.log(p1.nodeType) // 一般DOM节点的类型是1
```

![js_dom_1](https://github.com/qulingyuan/ly_q/blob/07f80d52eff7a1dee6922e0cbc81e507369eab62/doc/media/js_dom_1.png)

attribute：修改 html 属性，会改变 html 结构。

```javascript
// attribute
p1.setAttribute('lingyuan-name', 'ly_qu');
console.log( p1.getAttribute('lingyuan-name') );
p1.setAttribute('style', 'font-size: 50px;');
console.log( p1.getAttribute('style') );
```

![js_dom_2](https://github.com/qulingyuan/ly_q/blob/07f80d52eff7a1dee6922e0cbc81e507369eab62/doc/media/js_dom_2.png)

### DOM结构操作

```javascript
// 新建节点
const newP = document.createElement('p');
newP.innerHTML = 'this is newP'
// 插入节点
div1.appendChild(newP);

// 移动节点
const p1 = document.getElementById('p1');
div2.appendChild(p1); // 对于现有的元素节点执行appendChild()方法会移动节点

// 获取父元素
console.log( p1.parentNode );

// 获取子元素列表
const div1ChildNodes = div1.childNodes;
console.log( div1.childNodes );
// 这里要过滤掉text标签，根据nodeType去过滤
const div1ChildNodesP = Array.prototype.slice.call(div1.childNodes).filter(child => {
    if (child.nodeType === 1) {
        return true;
    }
    return false;
})
console.log('div1ChildNodesP', div1ChildNodesP);

// 删除节点
div1.removeChild(div1ChildNodesP[0]);
```



### DOM性能优化

DOM操作非常“昂贵”，应该避免频繁的DOM操作，有两种方式：

- 对DOM查询做缓存
- 将频繁操作改为一次性操作

#### DOM查询做缓存

```javascript
//不缓存DOM查询结果
for(let i=0;i<document.getElementsByTagName("p").length;i++){
  //每次循环，都会计算 length，频繁进行 DOM 查询
}
//缓存 DOM 查询结果
const pList = document.getElementsByTagName("p");
const length = pList.length;
for(let i=0;i<length;i++){
  //缓存 length，只进行一次 DOM 查询
}
```

#### 将频繁操作改为一次性操作

```javascript
//不好的写法
const list = document.getElementById('list');
for (let i  = 0; i < 20; i++) {
    const li = document.createElement('li');
    li.innerHTML = `List item ${i}`;
    // 立即插入文档list节点中
    list.appendChild(li);
}

//正确写法，将要插入的节点临时插入createDocumentFragment中，最后一次性插入list中
const list = document.getElementById('list');
// 创建一个文档片段，此时还没有插入到 DOM 结构中
const frag = document.createDocumentFragment();
for (let i  = 0; i < 20; i++) {
    const li = document.createElement('li');
    li.innerHTML = `List item ${i}`;
    // 先插入文档片段中
    frag.appendChild(li);
}
// 都完成之后，再统一插入到 DOM 结构中
list.appendChild(frag);
```







Vue和React框架封装了DOM操作。