const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/js/index.js',
    manager: './src/js/manager.js',
    login: './src/js/login.js',
    signup: './src/js/signup/signup.js',
  },
  resolve: {
    extensions: ['.js', '.css', '.ts'],
  },
  devServer: {
    port: 9000,
  },
  devtool: 'source-map',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        exclude: /node_module/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      hash: true,
      chunks: ['index'],
      template: './index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'manager.html',
      hash: true,
      chunks: ['manager'],
      template: './manager.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      hash: true,
      chunks: ['login'],
      template: './login.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'signup.html',
      hash: true,
      chunks: ['signup'],
      template: './signup.html',
    }),
  ],
};
