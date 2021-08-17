### 盒模型宽度计算

> offsetWidth = ( 内容宽度 + 内边距 + 边框 )，无外边距



```html
    <!-- 如下代码，请问 div1 的 offsetWidth 是多大？ -->
    <style>
        #div1{
            width:100px;
            padding: 10px;
            border: 1px solid #ccc;
            margin: 10px;
        }
    </style>
    <div id="div1"></div>
    <script>
        console.log(document.getElementById("div1").offsetWidth); // 122
    </script>
```

故此案例中为100+10✖️2+1✖️2 = 122px。

![css_box_width_1](https://github.com/qulingyuan/ly_q/blob/cf33cc949185f01caaf3996cb072aab38916deaf/doc/media/css_box_width_1.png)

补充：如果让offsetWidth等于100px，应该如何做？

答：添加`box-sizing:border-box`，

```html
   <style>
        #div1{
            width:100px;
            padding: 10px;
            border: 1px solid #ccc;
            margin: 10px;
            box-sizing: border-box; //告诉浏览器，你想要设置的边框和内边距的值是包含在width内的
        }
    </style>
    <div id="div1"></div>
    <script>
        console.log(document.getElementById("div1").offsetWidth); // 100
    </script>
```

![css_box_width_2](https://github.com/qulingyuan/ly_q/blob/cf33cc949185f01caaf3996cb072aab38916deaf/doc/media/css_box_width_2.png)

### margin纵向折叠问题

- 相邻元素的 margin-top 和 margin-bottom 会发生重叠
- 空白内容的 <p></p>也会重叠

```html
    <style>
        p {
            font-size: 16px;
            line-height: 1;
            margin-top: 10px;
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <p>AAA</p>
    <p></p>
    <p></p>
    <p></p>
    <p>BBB</p>
</body>
```

如图所示，`<p>AAA</p>`和`<p>BBB</p>`的间距是15px。

![margin_overlap_1]

### margin负值问题

- margin-top 和 margin-left 负值，元素向上、向左移动
- margin-right 负值，右侧元素左移，自身不受影响
- margin-bottom 负值，下方元素上移，自身不受影响

[代码演示案例]--链接

### BFC的理解与应用

Block format context，块级格式化上下文

一块独立渲染区域，内部元素的渲染不会影响边界以外的元素

#### 形成BFC的条件

- float 不是 none
- position 是 absolute 或 fixed
- overflow 不是 visible
- display 是 flex inline-block 等

#### BFC的常见应用

清除浮动

### float布局

如何实现圣杯布局和双飞翼布局

一般要求：

- 三栏布局，中间一栏最先加载和渲染（中间内容最重要）
- 两侧内容固定，中间内容随着宽度自适应
- 一般用于PC网页

技术总结：

- 使用 float 布局
- 两侧使用 margin 负值，以便和中间内容横向重叠
- 防止中间内容被两侧覆盖，圣杯布局用 padding 为两边留白，双飞翼布局用 margin 为两边留白。

手写clearfix

```css
 /* 手写 clearfix */
        .clearfix:after {
            content: '';
            display: table;
            clear: both;
        }
```





### flex布局

flex实现一个三点的色子

常用的设置属性

- flex-direction
- justify-content
- align-items
- flex-wrap
- align-self

