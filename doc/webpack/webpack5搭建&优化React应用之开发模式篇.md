## 前言

本文基于webpack5从零开始搭建一个 React 引用，并针对一些开发模式的配置进行优化。

### 创建项目

创建项目文件夹并初始化。在 shell 脚本中， `A && B`表示命令 A 运行成功后运行命令 B。

```shell
mkdir react-ly && cd react-ly && npm init -y
```

### 配置 entry 和 output

创建`config/webpack.dev.js`文件，添加 `entry` 和 `output` 配置：

```javascript
module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined, //打包路径
    filename: "static/js/[name].js", //entry文件打包生成的文件名
    chunkFilename: "static/js/[name].chunk.js", //动态导入或node_modules等方式生成的 chunk
    assetModuleFilename: "static/media/[hash:10][ext][query]", //静态资源打包
  },
};

```

`path`：是打包文件的目录路径。

`filename`：这里的`[name]`是 `entry` 文件的值，`entry` 这里没有明确指定则默认为 `main`。

`chunkFilename`：指动态导入或者 `node_modules`等方式生成的 `chunk`文件命名。

`assetModuleFilename`：静态资源文件的打包输出，这里的`[hash]`表示文件内容生成的哈希值，`[ext]` 为扩展名，`[query]`为参数。

在这里理清几个概念。一般我们都默认 `webpack` 打包生成的产物称为`bundle`。`bundle`是由 `chunk` 组成的。`chunk` 又分为几种类型，比如 `entry` 类型和 `child` 类型。一般情况下，只有一个 `chunk`，但是在有代码分割/按需加载的情况下，就会有多个 `chunk`。

### 添加loader处理 CSS

项目中一般可能会有css、less、sass、stylus等多种 CSS 类型文件，普通的 css 文件需要通过 `css-loader` 和 `style-loader` 两个 loader 来处理。其他的文件需要先转换成 css 再通过上面两个 `loader` 处理。这里有重复逻辑，我们可以写一个函数来处理。

```javascript
function getStyleLoaders(pre) {
  return [
    "style-loader",
    "css-loader",
    pre,
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"], //对css兼容性做处理，配合 package.json里面的 browserslist。
        },
      },
    },
  ].filter(Boolean);
}

module.exports = {
  entry: "./src/main.js",
  output: {
    path: undefined, //打包路径
    filename: "static/js/[name].js", //entry文件打包生成的文件名
    chunkFilename: "static/js/[name].chunk.js", //动态导入/node_modules等方式生成的 chunk
    assetModuleFilename: "static/media/[hash:10][ext][query]", //静态资源打包
  },
  module: {
    rules: [
      //处理 CSS 文件
      {
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders("less-loader"),
      },
      {
        test: /\.s[ac]ss$/,
        use: getStyleLoaders("sass-loader"),
      },
      {
        test: /\.styl$/,
        use: getStyleLoaders("stylus-loader"),
      },
    ],
  },
};
```

首先明确这些 loader 的作用：

`css-loader`：接收一个 css 文件，负责解析css 中引入其他资源如`require/url` 等问题。

`style-loader`：将解析好的 css 插入到 dom 中。

`less-loader`：将 `less` 编译为 `css`，其余 loader 以此类推。

`loader` 有两个属性：

1. `test`：匹配识别哪些文件需要处理
2. `use`：定义匹配成功时要使用的 loader。

需要注意的是，loader的加载顺序是**从右往左，从下往上**。而且后执行的 loader 接收前一个 loader 的返回内容。

在 css 处理中，因为 `css-loader` 需要接收 less-loader 等处理好的css 内容，`style-loader` 需要接收`css-loader` 处理好的内容。所以`style-loader` 放在最前面，`css-loader` 放在第二位，其余 loader 放在最后。

#### 优化点

这里针对 css 的兼容性做了优化。为了配合`postcss-loader`，需要在 `package.json`中添加如下配置：

```diff
+  "browserslist": [
+    "last 2 version",
+    "> 1%",
+    "not dead"
+  ],
```

`last 2 version`表示每个浏览器最近的两个版本。

`>1%`表示全球市场份额大于 1%的浏览器。

`not dead` 表示排除过去24 个月内没有官方支持的浏览器。

### 图片和字体等资源

在 webpack5 中，使用asset 来处理图片和字体等资源文件。

在 rules 下添加如下配置：

```javascript
// 处理图片
      {
        test: /\.(png|jpe?g|svg|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            //小于 10kb 的图片转换成data URI(base64格式)以节省空间
            maxSize: 10 * 1024,
          },
        },
      },
      //字体等其他资源
      {
        test: /\.(woff2?|ttf)$/,
        type: "asset/resource",
      },
```

说下`asset` 和 `asset/resource`的区别：

 `asset/resource`相当于 `file-loader`，将文件转化成 Webpack 能识别的资源，不做其他处理。

`asset`相当于 `url-loader`，将文件转化成 Webpack 能识别的资源，同时小于某个大小的资源会处理成 data URI (Base 64)形式

