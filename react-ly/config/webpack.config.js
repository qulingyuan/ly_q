const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取 css 成一个单独的文件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); //将 css 文件压缩
const TerserWebpackPlugin = require("terser-webpack-plugin"); //css压缩，js 也要压缩，否则会出问题
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

// 获取cross-env定义的环境变量
const isProduction = process.env.NODE_ENV === "production";

function getStyleLoaders(pre) {
  return [
    isProduction ? MiniCssExtractPlugin.loader : "style-loader",
    "css-loader",
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: ["postcss-preset-env"], //对css兼容性做处理，配合 package.json里面的 browserslist。
        },
      },
    },
    pre && {
      loader: pre,
      options:
        pre === "less-loader"
          ? {
              // antd自定义主题配置
              // 主题色文档：https://ant.design/docs/react/customize-theme-cn#Ant-Design-%E7%9A%84%E6%A0%B7%E5%BC%8F%E5%8F%98%E9%87%8F
              lessOptions: {
                modifyVars: { "@primary-color": "#1DA57A" },
                javascriptEnabled: true,
              },
            }
          : {},
    },
  ].filter(Boolean);
}

module.exports = {
  entry: "./src/main.js",
  output: {
    path: isProduction ? path.resolve(__dirname, "../dist") : undefined, //打包路径
    filename: isProduction
      ? "static/js/[name].[contenthash:10].js"
      : "static/js/[name].js", //entry文件打包生成的文件名
    chunkFilename: isProduction
      ? "static/js/[name].[contenthash:10].chunk.js"
      : "static/js/[name].chunk.js", //动态导入/node_modules等方式生成的 chunk
    assetModuleFilename: "static/media/[hash:10][ext][query]", //静态资源打包
    clean: true, //每次打包前删除之前的打包内容
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
            !isProduction && "react-refresh/babel", // 激活js的HMR
          ].filter(Boolean),
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
    isProduction &&
      new MiniCssExtractPlugin({
        filename: "static/css/[name].[contenthash:10].css",
        chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
      }),
    isProduction &&
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "../public"),
            to: path.resolve(__dirname, "../dist"),
            globOptions: {
              // 忽略index.html文件
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
    !isProduction && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? "source-map" : "cheap-module-source-map", //打包代码与源代码映射方式
  optimization: {
    splitChunks: {
      chunks: "all", //node_modules以及动态 import 的代码，打包分成多个 chunk
      cacheGroups: {
        // react react-dom react-router-dom 一起打包成一个js文件
        react: {
          test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
          name: "chunk-react",
          priority: 40,
        },
        // antd 单独打包
        antd: {
          test: /[\\/]node_modules[\\/]antd[\\/]/,
          name: "chunk-antd",
          priority: 30,
        },
        // 剩下node_modules单独打包
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name: "chunk-libs",
          priority: 20,
        },
      },
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`, //避免代码分割文件名变化导致缓存失效
    },
    // 是否需要进行压缩
    minimize: isProduction,
    minimizer: [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  },
  // webpack解析模块加载选项
  resolve: {
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
  performance: false, //关闭性能分析可以提高性能
};
