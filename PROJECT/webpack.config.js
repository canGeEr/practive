const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

const rootPath = __dirname;

module.exports = {
  mode: "development",
  entry: resolve("./src/index.js"),
  devtool: "source-map",
  module: {
    // 配置loader，翻译
    rules: [
      {
        test: /.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          // 预设解析react
          options: {
            presets: [
              [
                "@babel/preset-react",
                // 自动引入React
                // {
                //   runtime: "automatic",
                // },
              ],
            ],

            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              "react-refresh/babel",
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve("./index.html"),
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
