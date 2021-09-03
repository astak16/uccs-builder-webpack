const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const projectRoot = process.cwd();
console.log(projectRoot);
const setMap = () => {
  const entry = {};
  const htmlWebpackPlugin = [];
  const entryFiles = glob.sync(path.join(projectRoot, "./src/*/index.js"));
  entryFiles.map((entryFile) => {
    const match = entryFile.match(/\/src\/(.*)\/index\.js/);
    const pageName = match && match[1];
    entry[pageName] = entryFile;
    return htmlWebpackPlugin.push(
      new HtmlWebpackPlugin({
        template: path.join(projectRoot, `src/${pageName}/index.html`),
        filename: `${pageName}.html`, // 打包出来后的 html 名称
        chunks: ["vendors", "commons", pageName], // 打包出来后的 html 要使用那些 chunk
        inject: true, // 设置为 true，打包后的 js css 会自动注入到 HTML 中
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    );
  });

  console.log(entry);
  return {
    entry,
    htmlWebpackPlugin,
  };
};

const { entry, htmlWebpackPlugin } = setMap();

module.exports = {
  entry,
  output: {
    path: path.join(projectRoot, "dist"),
    filename: "[name]_[chunkhash:8].js",
  },
  stats: "errors-only",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name]_[contenthash:8].css",
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    function errorPlugin() {
      this.hooks.done.tap("done", (stats) => {
        if (
          stats.compilation.errors &&
          stats.compilation.errors.length &&
          process.argv.indexOf("--watch") === -1
        ) {
          console.log("build error"); //eslint-disable-line
          process.exit(1);
        }
      });
    },
  ].concat(htmlWebpackPlugin),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        // use: {
        //   loader: ["babel-loader"],
        //   options: {
        //     presets: ["@babel/preset-env", "@babel/preset-react"],
        //   },
        // },
      },
      {
        test: /.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [
                autoprefixer({
                  overrideBrowserslist: ["last 2 version", ">1%", "ios 7"],
                }),
              ],
            },
          },
          // {
          //   loader: "px2rem-loader",
          //   options: {
          //     remUnit: 75,
          //     remPrecision: 8,
          //   },
          // },
        ],
      },
      {
        test: /.(png|jpeg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[folder]/[name]_[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              filename: "[name]_[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
};
