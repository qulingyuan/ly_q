## Webpack是什么？

webpack是一个静态打包工具，说得通俗一点，就是把散落在项目中的各种类型的文件都转换成浏览器能够识别的 bundle。

一图胜千言：

![image-20220502142908464](https://cdn.jsdelivr.net/gh/qulingyuan/ly_picture@master/img/202205061903205.png)



## 核心概念

1. entry（入口）

表示 `webpack` 的打包入口，是构建模块打包的起点。可以指定多个 entry。

2. output（输出）

指示 Webpack 打包完的文件输出的位置，以及命名等，只能有一个 output。

3. loader（加载器）

**webpack 本身只能处理 JavaScript和 JSON 文件**，其他资源需要借助 loader 解析成 Webpack 直接能处理的。

4. plugins（插件）

扩展 Webpack 的功能，它监听 webpack 打包过程并执行对应的生命周期。

5. mode（模式）

不同模式下会开启不同的功能优化，主要有两种模式

- 开发模式：development
- 生产模式：production

## 常用配置项

- 输入输出：
  - `entry`：用于定义项目入口文件，Webpack 会从这些入口文件开始按图索骥找出所有项目文件；
  - `context`：项目执行上下文路径；
  - `output`：配置产物输出路径、名称等；
- 模块处理：
  - `resolve`：用于配置模块路径解析规则，配置路径别名等。
  - `module`：用于配置模块加载规则，对不同类型的资源使用相应的 Loader 进行处理
  - `externals`：用于声明外部资源，Webpack 会直接忽略这部分资源，跳过这些资源的解析、打包操作
- 后处理：
  - `optimization`：用于控制如何优化产物包体积，内置 Dead Code Elimination、Scope Hoisting、代码混淆、代码压缩等功能
  - `target`：用于配置编译产物的目标运行环境，支持 web、node、electron 等值，不同值最终产物会有所差异
  - `mode`：编译模式短语，支持 `development`、`production` 等值，可以理解为一种声明环境的短语

## 环境搭建

创建并进入文件夹

```shell
mkdir webpack5-action && cd webpack5-action
```

npm 初始化项目

```shell
npm init -y
```

执行成功后，文件夹下会生成一个 `package.json` 文件。

安装 webpack 相关的依赖包

```shell
npm install webpack webpack-cli webpack-dev-server --save-dev
```

这里稍微解释一下这几个包的作用：

`webpack` 是 `webpack` 的核心包；`webpack-cli` 是官方提供的命令行界面；`webpack-dev-server` 提供一个 web server，可以让代码实时重加载。

`webpack` 相关的包只在开发的时被使用，部署时候不需要依赖，所以加上`--save-dev`表明将 `webpack` 安装在 `dev-dependency` 中。

在根目录下创建一个 `src` 文件夹，并在文件夹内创建 `index.js`，在根目录创建`config`目录，并在其中创建 `webpack.prod.js` 和 `webpack.dev.js`文件，均添加如下配置：

```json
const path = require("path");

module.exports = {
  //入口   相对路径和绝对路径都行
  entry: "./src/index.js",
  //输出
  output: {
    //文件输出目录，必须是绝对路径
    //__dirname 当前文件的文件夹绝对路径
    path: path.resolve(__dirname, "../dist"),
    //输出文件名
    filename: "[name].[contenthash:8].bundle.js",
  },
  //模式 webpack.dev.js中要配置成 development.
  mode: "production",
};

```

解释下上面配置的作用：

- mode：表示开发模式，可选值为`'none' | 'development' | 'production'`，默认值为 `production`，不同模式下，开启了不同的功能优化。
- entry：表示 `webpack` 的打包入口，是构建模块打包的起点。
- output：表示创建的 bundle 的输出位置。`entry` 可以有多个，但 `output` 只能有一个。

你肯定想问 `name`、`contenthash:8`都是什么东西，别急，在解释这个之前，让我们先执行一下打包操作。

先在 index.js 中输入如下代码：

```javascript
console.log("Page_not_found");
```

然后在 `package.json`中的 scripts 属性增加下面一条命令：

```json
  "scripts": {
    "start": "npm run dev",
    "dev": "npx webpack serve --config ./config/webpack.dev.js",
    "build": "npx webpack --config ./config/webpack.prod.js"
  }
```

此时执行`npm run build`，可以看到 `dist` 目录下生成了一个 `main.e1133424.bundle.js` 文件：

![image-20220506221750513](https://cdn.jsdelivr.net/gh/qulingyuan/ly_picture@master/img/202205062217602.png)

解释一下 `filename` 属性中用到了使用`[]`包装起来的变量，它们被称为“占位符”。其中`contenthash`表示文件内容的 `hash` 值，主要是用来判断文件内容是否有改动，后面加`:8`表示限定 `hash`值的位数。`name` 一般会用于 `entry` 为多入口文件时，会对应 `entry` 的名称，这里我们没有设置 `entry` 的名称，默认为 `main`。如果设置 entry 如下:

```javascript
  entry: {
    input: "./src/index.js",
  },
```

这时生成的文件名称的 `name` 部分就为 `input` 了。

以下三种方式都是可以的：

- `[name].[hash].bundle.js`
- `[name].[chunkhash].bundle.js`
- `[name].[contenthash].bundle.js`

创建一个 `html` 文件并将打包好的 js 文件通过 `<script>`标签引入，即可看到代码效果。

## html-webpack-plugin

每次打包后我们都是通过`<script src="xxx.bundle.js">`的方式来引入`bundle`文件，而每次 `bundle` 的文件名都是随机生成的，这使得我们每次都要手动修改 `src`，十分麻烦。我们可以使用`html-webpack-plugin`这个 `plugin` 来生成 `html` 并自动注入 `bundle` 文件。

安装 `html-webpack-plugin`

```shell
npm i html-webpack-plugin --save-dev
```

两个配置文件均添加如下配置：

```diff
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "[name].[contenthash].bundle.js",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "lingyuan",
      template: "./public/index.html",
    }),
  ],
};

```

新建一个`public/index.html`，上面 `template`的意思是以该 html 作为模板，即在打包的时候，会将这个 html 文件赋值到 `output` 目录，并自动注入打包好的脚本文件，我们就不需要手动创建 html了。

在`output`属性下添加 `clean: true`，表示在生成文件之前清空 output 目录，这是 `v5.20+`的新特性。

## webpack-dev-server

为了方便开发实时调试代码，可以使用`webpack-dev-server`:

在 `package.json`的 `script` 下添加：

```javascript
		"start": "npm run dev",
    "dev": "webpack serve --config ./config/webpack.dev.js",
    "build": "webpack --config ./config/webpack.prod.js"
```

在`webpack.dev.js`中增加如下配置:

```javascript
module.exports = {
	//...
  devServer: {
    host: "localhost", // 主机号
    port: 3000, // 端口号
    open: true, // 自动打开浏览器
    hot: true, // 开启HMR
    compress: true, // 开启 gzip 压缩
    historyApiFallback: true, // 解决前端路由刷新404问题
  },
}
```

执行 `npm start`即可直接在浏览器打开项目。

