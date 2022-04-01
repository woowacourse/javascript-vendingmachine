const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.ts",
    login: "./src/login.js",
    signup: "./src/signup.js",
  },
  resolve: {
    extensions: [".js", ".css", ".ts"],
  },
  devServer: {
    port: 9000,
  },
  devtool: "source-map",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_module/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "index",
      hash: true,
      filename: "index.html",
      chunks: ["index"],
      template: "./index.html",
    }),
    new HtmlWebpackPlugin({
      title: "login",
      hash: true,
      filename: "login.html",
      chunks: ["login"],
      template: "./login.html",
    }),
    new HtmlWebpackPlugin({
      title: "signup",
      hash: true,
      filename: "signup.html",
      chunks: ["signup"],
      template: "./signup.html",
    }),
  ],
};
