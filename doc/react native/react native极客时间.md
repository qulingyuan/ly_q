React Native 组件样式有继承关系，分三层：

1. 通用样式：Layout、Transform、Shadow

2. View 组件样式：继承所有通用样式，外加backgroundColor、opacity、backfaceVisibility。

3. Text、Image 等其他组件样式：都继承 View 组件样式。外加自身的样式。

![image-20220906190021359](https://raw.githubusercontent.com/qulingyuan/ly_picture/master/img/202209061900668.png)

父容器View 的默认样式是

```css
{
		display:'flex',
    flexDirection:'column'
}
```

Android 文字默认会有内边距且基于基线对齐，这会导致文字垂直居中时偏下。因此垂 直居中时，最好把内边距关掉，并把文字放在中线而不是基线上。

```css
// 文字默认内边距，会导致垂直居中偏下
includeFontPadding: false,
// 文字默认基于基线对齐，会导致垂直居中偏下
textAlignVertical: 'center',
```

推荐使用样式表 StyleSheet 来写样式，而不是内联的方式，这样样式对象只创建一次，可以减少性能的损耗。

https://github.com/facebook/react-native/blob/8bd3edec88/Libraries/StyleSheet/StyleSheetTypes.js

React Native的 Image 组件支持四种加载图片的方法：

1. 静态图片资源：本地内置图片，通过require引入，注意require的参数只能是字面常量，不能是变量。在“编译时”提前获取了图片宽高等信息，在“构建时”内置 了静态图片资源，因此在“运行时”，程序可以提前获取图片宽高和真正的图片资源。因此，即使不设置图片宽高，也有一个默认宽高来显示。
2. 网络图片：必须指定宽高。
3. 宿主应用图片：指的是React Native 使用 **Android/iOS** 宿主应用的图片进行加载的方式。由于没有安全检查，容易引发报错；以及需要确定应用版本等信息，故不建议使用。
4. Base64 图片：

React Native Android 用的是 Fresco 第三方图片加载组件的缓存机制，iOS 用的是 NSURLCache 系统提供的缓存机制。

iOS 的 NSURLCache 遵循的是 HTTP 的 Cache-Control 缓存策略，同时当 CDN 图片 默认都已经设置了 Cache-Control 时，iOS 图片就是有缓存的。

而 NSURLCache 的默认最大内存缓存为 512kb，最大磁盘缓存为 10MB，如果缓存图片的体 积超出了最大缓存的大小限制，那么一些老的缓存图片就会被删除。

预加载：`Image.prefetch(url);`

