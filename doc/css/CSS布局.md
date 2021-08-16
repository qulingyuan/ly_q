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



### margin负值问题

对margin的top、

### BFC的理解与应用



### float布局

如何实现圣杯布局和双飞翼布局

手写clearfix

### flex布局

flex实现一个三点的色子

