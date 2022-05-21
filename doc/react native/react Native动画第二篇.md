## 前言

上一篇，主要介绍了如何编写简单动画，以及复杂的动画的思想。今天这篇，主要聊聊如何通过`useNativeDriver` 这个属性优化 `Animated` 动画。

## useNativeDriver

还记得[上一篇](https://juejin.cn/post/7100068545953792030)中，我们介绍了，我们最常用的动画更新函数就是 `timing()`，`timing()`的配`config`选项中有一个选项叫做 useNativeDriver（使用原生驱动）。

`Animated` 的 API 是可序列化的（可转化为字符串以便通信和存储）。开启`useNativeDriver`可以在动画开始前就把所有的配置信息都发送到原生端，然后利用原生代码在 UI 线程上执行动画，而不用每一帧都在两端间来回沟通。这样动画完全脱离了 JS 线程，即便 JS 线程被卡住，也不会影响到动画了。

所以想要对动画进行优化，我们只需要在动画配置中加上`useNativeDriver:true`即可：

```react
const animatedValue = useRef(new Animated.Value(0)).current;
//timing
Animated.timing(animatedValue, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true // <--timing()方法在这里添加即可
}).start();
//event
<Animated.ScrollView
  scrollEventThrottle={1}
  onScroll={Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: animatedValue }
        }
      }
    ],
    { useNativeDriver: true } // <-- event()方法在这里添加
  )}>
  {content}
</Animated.ScrollView>
```

我们来讲上一节的进度条的代码中的`useNativeDriver`改成 `true`：

```react

const App = () => {
    //使用 ref 来保存 Animated.Value 动画值
    const widthX = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        //表示进入页面后三秒钟时间内 widthX 变量从 0 变化到 375，记住最后一定要有start()来启动动画。
        Animated.timing(widthX, {
            toValue: 375,
            duration: 3000,
            useNativeDriver: true, //<-- 这里改成 true 会报错。
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    height: 20,
                    width: widthX,
                    //这里用到了interpolate方法来进行插值计算，一个动画值对应了两个属性
                    backgroundColor: widthX.interpolate({
                        inputRange: [0, 375],
                        outputRange: ['green', 'red'],
                    }),
                }}
            >
            </Animated.View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
    },
});
```

会报出如下错误：

![image-20220521152022061](https://cdn.jsdelivr.net/gh/qulingyuan/ly_picture@master/img/202205211520156.png)

报错信息翻译过来：样式属性`width`不被 `animated` 模块所支持。

由此可知，`useNativeDriver` 只能应用于**非布局属性**，如**`transform`,`opacity`**，而不能应用非布局属性上。

对于布局属性，我们如何进行优化呢？答案是**将布局属性动画转换成非布局属性动画**。

## 布局属性转换技巧

1. 元素颜色变化：比如元素的颜色由绿到红，我们可以创建两个相同大小的兄弟元素并分别设置为绿色和红色（红色元素在上层），并使用`absolute`布局让二者叠加。利用 `opacity` 来控制上层元素的不透明度由0变为1 即可。
2. 宽度/高度的变化：外层使用一个相同大小的父元素设置`overflow:hidden`属性作为可见的窗口，利用 `translate`来移动内部元素，使得父元素展示的子元素大小发生变化。

接下来，我们就使用上面两个方法来对上面代码进行改造:

```
const App = () => {
    const widthX = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(widthX, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.parent}>
                <Animated.View
                    style={[
                        styles.brother,
                        {
                            transform: [{
                                translateX: widthX.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 375],
                                }),
                            }],
                        },
                    ]}
                >
                </Animated.View>
                <Animated.View
                    style={[
                        styles.processBar,
                        {
                            transform: [{
                                translateX: widthX.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0, 375],
                                }),
                            }],
                            opacity: widthX,
                        }]}
                >
                </Animated.View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        justifyContent: 'center',
    },
    parent: {
        height: 20,
        width: 375,
        overflow: 'hidden',
    },
    brother: {
        position: 'absolute',
        height: 20,
        width: 375,
        left: -375,
        backgroundColor: 'green',
    },
    processBar: {
        position: 'absolute',
        height: 20,
        width: 375,
        left: -375,
        backgroundColor: 'red',
    },
});
```

看下效果，很完美：

![2022-05-21_17-07-32 (1)](https://cdn.jsdelivr.net/gh/qulingyuan/ly_picture@master/img/202205211709423.gif)

## 总结

在React Native中，使用 `Animated` 时，要尽可能使用`useNativeDriver` 来提升动画性能，但`useNativeDriver`只能用于非布局属性。对于布局属性，我们可以通过一些技巧将其转换成布局属性的动画。