



```html
<div id="a">
    <div id="b">
      <div id="c">
        <div id="d"></div>
      </div>
    </div>
</div>

<script>
    document.getElementById('a').addEventListener('click', function(e) {
      console.log('target:' + e.target.id + '&currentTarget:' + e.currentTarget.id);
    });    
    document.getElementById('b').addEventListener('click', function(e) {
      console.log('target:' + e.target.id + '&currentTarget:' + e.currentTarget.id);
    });    
    document.getElementById('c').addEventListener('click', function(e) {
      console.log('target:' + e.target.id + '&currentTarget:' + e.currentTarget.id);
    });    
    document.getElementById('d').addEventListener('click', function(e) {
      console.log('target:' + e.target.id + '&currentTarget:' + e.currentTarget.id);
    });
</script>
```



上面事件的绑定都是在冒泡阶段的，当我们点击最里层的**元素d**的时候，会依次输出:

```javascript
target:d&currentTarget:d
target:d&currentTarget:c
target:d&currentTarget:b
target:d&currentTarget:a
```

从输出中我们可以看到，`event.target`指向引起触发事件的元素，而`event.currentTarget`则是事件绑定的元素，只有被点击的那个目标元素的`event.target`才会等于`event.currentTarget`。

如果我们把事件都绑定在捕获阶段，然后还是点击最里层的**元素d**，这时`event.target`还依旧会指向d，因为那是引起事件触发的元素，因为`event.currentTaget`指向事件绑定的元素，所以在捕获阶段，最先来到的元素是a,然后是b,接着是c,最后是d。所以输出的内容如下：



https://www.cnblogs.com/yzhihao/p/9398917.html