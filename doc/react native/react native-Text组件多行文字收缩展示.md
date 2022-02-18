React native 中 Text 组件实现多行文字收缩和展示。

### 核心思想：

[`onTextLayout`](https://reactnative.dev/docs/next/text#ontextlayout) 属性可以拿到`<Text>`布局相关的属性

[`numberOfLines`](https://reactnative.dev/docs/next/text#numberoflines) 可以使得文本截断至指定的行数。

[`ellipsizeMode`](https://reactnative.dev/docs/next/text#ellipsizemode) 配合 `numberOfLines` 属性实现文本截断。

### 代码实现：

```react
//  逻辑部分
		const NUM_OF_LINES = 2;
    const [showMore, setShowMore] = useState(false);
    const onTextLayOut = (e) => {
        const linesArray = e.nativeEvent.lines;
        if (linesArray.length >= NUM_OF_LINES) {
            const textArray = linesArray.map(item => item.text.length);
            textArray.length = textArray.length - 1;
            let shortText = Math.min(...textArray);
            if (linesArray[linesArray.length - 1].text.length >= shortText) {
                setShowMore(true);
            }
        }
    };
//  UI部分

```

