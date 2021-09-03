const merge = require("webpack-merge");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const cssnano = require("cssnano");
const baseConfig = require("./webpack.base");

const prodConfig = {
  mode: "production",
  optimization: {
    splitChunks: {
      minSize: 0, // 抽离公共包，最小的大小，单位是字节
      name: true,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "all",
          priority: -20, // 值越大,优先级越高.模块先打包到优先级高的组里
          minChunks: 1,
        },
        vendors: {
          // test: /(react|react-dom)/,
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -10, // 值越大,优先级越高.模块先打包到优先级高的组里
          chunks: "all",
        },
      },
    },
  },
  plugins: [
    // new HtmlWebpackTagsPlugin({
    //   scripts: [
    //     {
    //       path: "https://11.url.cn/now/lib/16.2.0/react.min.js",
    //       external: {
    //         packageName: "react",
    //         variableName: "React",
    //       },
    //     },
    //     {
    //       path: "https://11.url.cn/now/lib/16.2.0/react-dom.min.js",
    //       external: {
    //         packageName: "react-dom",
    //         variableName: "ReactDOM",
    //       },
    //     },
    //   ],
    // }),
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssnano,
    }),
  ],
};

module.exports = merge(baseConfig, prodConfig);
