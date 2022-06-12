const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

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
      // 处理js
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true, //是否开启缓存
          cacheCompression: false, //是否开启压缩
          plugins: [
            "react-refresh/babel", //支持 react 和js热更新
          ],
        },
      },
    ],
  },
  plugins: [
    //配合.eslintrc.js配置文件
    new EslintWebpackPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true, //开启 eslint 缓存
      //指定缓存位置
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
  mode: "development",
  devtool: "cheap-module-source-map", //打包代码与源代码映射方式
  optimization: {
    splitChunks: {
      chunks: "all", //node_modules以及动态 import 的代码，打包分成多个 chunk
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`, //避免代码分割文件名变化导致缓存失效
    },
  },
  // webpack解析模块加载选项
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
    },
    // 自动补全文件扩展名
    extensions: [".jsx", ".js", ".json"], //从头到尾匹配，匹配到后面的扩展名就不看了
  },
  devServer: {
    host: "localhost",
    port: 3000,
    open: true,
    hot: true, // 开启HMR
    historyApiFallback: true, // 解决前端路由刷新404问题
  },
};
