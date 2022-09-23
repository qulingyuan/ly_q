loader有什么用

`webpack` 只能理解 `JavaScript` 和 `JSON` 文件，对于其他类型的文件，就需要 `loader` 将其转化成`webpack` 能够理解的模块。

loader配置写在 `module.rules`里，有两个属性：

1. `test` 属性：识别出哪些文件会被转换。
2. `use` 属性：定义出在进行转换时，应该使用哪个 loader。多个 loader可以使用数组存储，按照从右向左的顺序链式调用，即第一个 loader 会将其结果传递给下一个 loader。

## 处理 CSS

### 开发模式

```javascript
module.exports = {
	//...
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
```

解释下每个 loader 的作用：

[`css-loader`](https://webpack.js.org/loaders/css-loader/)：将 CSS 文件编译成 Webpack 能识别的模块。

[`style-loader`](https://webpack.js.org/loaders/style-loader/)：在 html 文件中动态创建一个`style`标签，css 模块的内容。

[`mini-css-extract-plugin`](https://webpack.js.org/plugins/mini-css-extract-plugin/)：该插件会将 CSS 代码抽离到单独的 `.css` 文件，并将文件通过 `<link>` 标签方式插入到页面中。

css 文件需要先解析处理，再动态插入，因此，`css-loader` 需要放在 `style-loader` 后面，相当于`style-loader(css-loader(css))`。

同理，如果项目中使用了less或sass等css 预处理器，就需要在css-loader后面添加相应的 loader：

```shell
npm i css-loader style-loader less-loader sass-loader sass stylus-loader -D
```

- `less-loader`：负责将 Less 文件编译成 Css 文件

- `sass-loader`：负责将 Sass 文件编译成 css 文件
- `sass`：`sass-loader` 依赖 `sass` 进行编译
- `stylus-loader`：负责将 Styl 文件编译成 Css 文件

```javascript
module.exports = {
	//...
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", "stylus-loader"],
      },
    ],
  },
};
```

### 生产模式

#### mini-css-extract-plugin

使用style-loader，js、css 资源无法并行加载，因此在生产模式中，使用`mini-css-extract-plugin`，该插件会将 CSS 代码抽离到单独的 `.css` 文件，并将文件通过 `<link>` 标签方式插入到页面中，加载性能更好。

#### postCSS

同时，可以使用 `postcss` 对 css 的兼容性问题做一个处理。postCSS之于 css，相当于 babel 之于 JavaScript。

#### 控制兼容性

我们可以在 `package.json` 文件中添加 `browserslist` 来控制样式的兼容性做到什么程度。举个例子：

```json
{
  // 设置兼容浏览器 ie8 以上
  "browserslist": ["ie >= 8"]
}
```

更多的 `browserslist` 配置，查看[browserslist 文档](https://github.com/browserslist/browserslist)

实际开发中我们一般不考虑旧版本浏览器了，所以我们可以这样设置：

```json
{
  // 实际开发中的配置
  "browserslist": ["last 2 version", "> 1%", "not dead"]
}
```

### 

```shell
npm i mini-css-extract-plugin postcss-loader postcss postcss-preset-env -D
```

```javascript
mode: "production",
  module: {
    rules: [
      {
        // 用来匹配 .css 结尾的文件
        test: /\.css$/,
        // use 数组里面 Loader 执行顺序是从右到左
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
        ],
      },
    ],
  },
```

可以看到，单独一个 css 配置就很多了，如果加上Less/Sass/Stylus就更繁琐了，因此我们可以抽离成一个函数：

```javascript
```

