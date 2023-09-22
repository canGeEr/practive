const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");

const rootPath = __dirname;

module.exports = {
  mode: "development",
  entry: resolve(rootPath, "./src/index.js"),
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
            // "react-refresh/babel",
            plugins: ["@babel/plugin-syntax-decorators"],
          },
        },
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(rootPath, "./index.html"),
    }),
  ],
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    port: 3002,
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.use((req, res, next) => {
        res.set({
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": req.headers.origin || "*",
          "Access-Control-Allow-Headers": "X-Requested-With,Content-Type",
          "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
        });
        console.log(req.url, "发起七个球");
        next();
      });
      return middlewares;
    },
  },
};
