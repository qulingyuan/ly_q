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

- 相邻元素的 margin-top 和 margin-bottom 会发生重叠，折叠后的值以最大边距为准。
- 空白内容的 <p></p>也会重叠
- 行内框、浮动框或绝对定位框之间的外边距不会叠加。

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



### absolute 和 relative 定位

- relative 依据自身定位
- absolute 依据最近一层的**定位元素**定位

#### 定位元素

- absolute relative fixed
- body



### 居中对齐的实现方式

#### 水平居中

inline元素：text-align:center

block元素：margin:0 auto

absolute 元素：left:50% + margin-left:元素宽度一半的负值





### 垂直居中

- inline元素：inline-height 的值等于 height 值
- absolute 元素：
  - top:50% + margin-top:元素高度一半的负值（需要知道子元素的尺寸）
  - transform(-50%,-50%)  -----transform为CSS3属性，兼容性要注意
  - top、left、bottom、right 均为 0 + margin:auto   -----无兼容性问题



### CSS-图文样式

### line-height 如何继承

- 具体数值，如 30px，则继承该值
- 比例，如 2/1.5，则继承该比例
- 百分比，如 200%，则继承计算出来的值





### CSS-响应式布局

### rem 是什么

rem是一个长度单位

- px，绝对长度单位，最常用
- em，相对长度单位，相对于父元素，不常用
- rem，相对长度单位，相对于根元素，常用于响应式布局





### 响应式布局的常见方案？

1. media-query，根据不同的屏幕宽度设置根元素font-size
2. rem，基于根元素的相对定位



rem的弊端：“阶梯”性



### 网页视口尺寸

- window.screen.height //屏幕高度
- window.innerHeight //网页视口高度
- document.body.clientHeight //body高度



### vw/vh

- vh 网页视口高度 (window.innerHeight) 的 1/100
- vw 网页视口宽度 (window.innerWidth) 的1/100
- vmax 取两者最大值；vmin取两者最小值



