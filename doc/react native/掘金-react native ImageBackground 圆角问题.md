## ImageBackground 圆角显示异常

`ImageBackground` 组件除了正常的 `style` 属性之外，还有一个[`imageStyle`](https://reactnative.dev/docs/image-style-props)属性用来设置 `borderRadius` 等相关的属性。

如果我们不使用这个属性，直接使用 `style` 来设置 `borderRadius` 相关的属性。

```react
 <ImageBackground source={{uri: backGroundImageUrl}}
                             style={{
                                 height: 58,
                                 flexDirection: 'row',
                                 justifyContent: 'space-between',
                                 borderTopLeftRadius: 16,
                                 borderTopRightRadius: 16,
                                 // overflow: 'hidden',
                             }}>
```

此时的效果如图，并没有并没有显示出圆角效果。

![image-20220215191513507](https://gitee.com/qulingyuan/ly_picture/raw/master/img/2022/02/202202151915688.png)

我们可以通过添加`overflow:hidden`属性来解决这个问题，添加后效果：

![image-20220215191652970](https://gitee.com/qulingyuan/ly_picture/raw/master/img/2022/02/202202151916011.png)

如图，达到了我们的预期效果，不过还有更好的解决方案，即使用`imageStyle`来设置 `borderRadius`：

```react
<ImageBackground source={{uri: backGroundImageUrl}}
                             imageStyle={{
                                 borderTopLeftRadius: 16,
                                 borderTopRightRadius: 16,
                             }}
                             style={{
                                 height: 58,
                                 flexDirection: 'row',
                                 justifyContent: 'space-between',
                             }}>
```

![image-20220215191915288](https://gitee.com/qulingyuan/ly_picture/raw/master/img/2022/02/202202151919331.png)

一切 ok。

总结：使用 `ImageBackground` 组件时，`borderRadius` 等属性要尽量写在 `imageStyle` 中才能避免出现问题。