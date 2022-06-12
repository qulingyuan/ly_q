const path = require("path");
const EslintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取 css 成一个单独的文件
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin"); //将 css 文件压缩
const TerserWebpackPlugin = require("terser-webpack-plugin"); //css压缩，js 也要压缩，否则会出问题
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

function getStyleLoaders(pre) {
  return [
    MiniCssExtractPlugin.loader,
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
    path: path.resolve(__dirname, "../dist"), //打包路径
    filename: "static/js/[name].[contenthash:10].js", //entry文件打包生成的文件名
    chunkFilename: "static/js/[name].[contenthash:10].chunk.js", //动态导入/node_modules等方式生成的 chunk
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
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:10].css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css",
    }),
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
  ],
  mode: "production",
  devtool: "source-map", //打包代码与源代码映射方式
  optimization: {
    splitChunks: {
      chunks: "all", //node_modules以及动态 import 的代码，打包分成多个 chunk
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}.js`, //避免代码分割文件名变化导致缓存失效
    },
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
};
