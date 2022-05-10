## 前言

上一节中，每次打包后我们都是通过`<script src="xxx.bundle.js">`的方式来引入`bundle`文件，而每次 `bundle` 的文件名都是随机生成的，这使得我们每次都要手动修改 `src`，十分麻烦。我们可以使用`html-webpack-plugin`这个 `plugin` 来生成 `html` 并自动注入 `bundle` 文件。

## 配置 html-webpack-plugin

安装 `html-webpack-plugin`

```shell
npm i html-webpack-plugin --save-dev
```

添加 `webpack.config.js`配置：

```diff
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[chunkhash].bundle.js",
+   clean: true,
  },
+ plugins: [
+   new HtmlWebpackPlugin({
+     title: "lingyuan",
+     template: "./public/index.html",
+   }),
+ ],
};

```

新建一个`public/index.html`，上面 `template`的意思是以该 html 作为模板，即在打包的时候，会将这个 html 文件赋值到 `output` 目录，并自动注入打包好的脚本文件，我们就不需要手动创建 html了。

注意到，我们在`output`属性下添加 `clean: true`，表示在生成文件之前清空 output 目录，这是 `v5.20+`的新特性。

## webpack-dev-server

为了方便开发实时调试代码，可以使用`webpack-dev-server`:

在 `package.json`的 `script` 下添加：

```diff
+  "start": "webpack serve"
```

在`webpack.config.js`中增加如下配置:

```diff
+  devServer: {
+    compress: true,
+    port: 3000,
+    hot: true,
+    open: true,
+  },
```

`compress`： 是否开启 gzip 压缩；

`port`： 指定端口号。

`hot`：开启热更新替换。

`open`：自动打开浏览器。

执行 `npm start`即可直接在浏览器打开项目。
