## 前言

上一节中，每次打包后我们都是通过`<script src="xxx.bundle.js">`的方式来引入`bundle`文件，而每次 `bundle` 的文件名都是随机生成的，这使得我们每次都要手动修改 `src`，十分麻烦。我们可以使用`html-webpack-plugin`这个 `plugin` 来生成 `html` 并自动注入 `bundle` 文件。

## 配置 html-webpack-plugin

安装 `html-webpack-plugin`

```shell
```

