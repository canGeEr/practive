const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

function resolve(...args) {
  return path.resolve(__dirname, ...args);
}

module.exports = {
  mode: 'development',
  entry: resolve('./src/index.js'),
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve("./index.html"),
    }),
  ],
  devServer: {
    port: 3000
  }
}