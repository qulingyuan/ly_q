## Webpack解决了什么问题？

@babel/core 是 babel 编译库的核心包，它负责把 js 代码分析成 ast (抽象语法树），方便各个插件分析语法，并进行相应的处理。注意，它本身并不对语法做处理。

babel-loader 是 webpack 调用 babel @babel/core 的一个 loader，webpack 通过这个 laoder 来将 babel 的能力集成进来，所以，babel-loader 依赖了@babel/core, 这就是安装 babel-loader 需要同时安装 @babel/core 的原因。

Webpack 是一个静态模块打包工具，说白了就是把前端开发中的各种类型文件转换成浏览器看得懂的`.js`,`.css`等文件。

![image-20220502142908464](https://gitee.com/qulingyuan/ly_picture/raw/master/img/image-20220502142908464.png)

官网的图片表明了一切。

## Webpack的基本概念

### entry



### loader

Css-loader 用于加载.css 文件，并且转换成 commonjs 对象。

Style-loader 将样式通过`<style>`标签插入到 head 中。

less-loader 用于将 less 转换成 css。

解析 ES6：

webpack 增加 `babel-loader`

package.json:

```json
{
  "name": "react-qly",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.17.10", //babel 核心
    "@babel/preset-env": "^7.17.10", //解析 ES6
    "@babel/preset-react": "^7.16.7", //解析 JSX
    "babel-loader": "^8.2.5", //webpack 的 loader
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}
```



`.babelrc`

```json
{
  "presets":[
    "@babel/preset-env"  #
  ]
}
```

监听文件变化两种方式：

1. 配置文件中:

```package
{
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
```



`--watch`
