const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CnameWebpackPlugin = require('cname-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    404: './src/404.js',
  },
  resolve: {
    extensions: ['.js', '.css', '.ts'],
  },
  devServer: {
    port: 9000,
    historyApiFallback: true,
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
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['index'],
      template: './index.html',
    }),
    new HtmlWebpackPlugin({
      filename: '404.html',
      chunks: ['404'],
      template: './404.html',
    }),
    new CnameWebpackPlugin({
      domain: 'vendingmachine.woojeongmin.com',
    }),
  ],
};
