## 为什么要写这系列文章？

个人觉得 webpack5 文档写的有点散，初学的话不知道从哪里入手，这系列文章主要把webpack5 在实际项目中常用一些配置串讲起来，希望对大家理解 webpack 有帮助。

## Webpack是什么？

webpack是一个静态打包工具，说得通俗一点，就是把散落在项目中的各种类型的文件都转换成浏览器能够识别的 bundle。

一图胜千言：

![image-20220502142908464](https://cdn.jsdelivr.net/gh/qulingyuan/ly_picture@master/img/202205061903205.png)

## 创建并初始化项目

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

## 基本配置

在根目录下创建一个 `src` 文件夹，并在文件夹内创建 `index.js`，此时文件的目录结构如下：

```shell
webpack5-action
├── node_modules
├── package-lock.json
├── package.json
└── src
    └── index.js
```

创建 `webpack.config.js` 文件，

```json
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash:8].bundle.js",
  },
};

```

解释下上面配置的作用：

- mode：表示开发模式，可选值为`'none' | 'development' | 'production'`，默认值为 `production`，不同模式下，开启了不同的功能优化。
- entry：表示 `webpack` 的打包入口，是构建模块打包的起点。
- output：表示创建的 bundle 的输出位置。`entry` 可以有多个，但 `output` 只能有一个。

你肯定想问 `name`、`contenthash:8`都是什么东西，别急，在解释这个之前，让我们先执行一下打包操作。

在 `package.json`中的 scripts 属性增加下面一条命令：

```json
  "scripts": {
    "build": "webpack"
  }
```

在 index.js 中输入如下代码：

```javascript
console.log("Page_not_found");
```

此时执行`npm run build`，可以看到 `dist` 目录下生成了一个 `main.e1133424.bundle.js` 文件：

![image-20220506221750513](https://cdn.jsdelivr.net/gh/qulingyuan/ly_picture@master/img/202205062217602.png)

解释一下 `filename` 属性中用到了使用`[]`包装起来的变量，它们被称为“占位符”。其中`contenthash`表示文件内容的 `hash` 值，主要是用来判断文件内容是否有改动，后面加`:8`表示限定 `hash`值的位数。`name` 一般会用于 `entry` 为多入口文件时，会对应 `entry` 的名称，这里我们没有设置 `entry` 的名称，默认为 `main`。如果设置 entry 如下:

```javascript
  entry: {
    input: "./src/index.js",
  },
```

这是生成的文件名称的 `name` 部分就为 `input` 了

以下三种方式都是可以的：

- `[name].[hash].bundle.js`
- `[name].[chunkhash].bundle.js`
- `[name].[hash].bundle.js`

创建一个 `html` 文件并将打包好的 js 文件通过 `<script>`标签引入，即可看到代码效果。

至此，我们已经熟悉了 `webpack` 中非常重要的三个核心概念：`entry`、`output` 和 `mode`。下一篇，我们将会介绍 `loader` 的使用。
