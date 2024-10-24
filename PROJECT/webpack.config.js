const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

const rootPath = process.cwd();

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "eval",
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
      template: resolve(__dirname, "./index.html"),
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
