const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/js/index.ts',
    login: './src/js/user/login.js',
    signup: './src/js/user/signup.js',
    profile: './src/js/user/profile.js',
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
              plugins: ['@babel/plugin-transform-runtime'],
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
      template: './index.html',
      filename: 'index.html',
      chunks: ['index'],
      hash: true,
    }),
    new HtmlWebpackPlugin({
      template: './login.html',
      filename: 'login.html',
      chunks: ['login'],
      hash: true,
    }),
    new HtmlWebpackPlugin({
      template: './signup.html',
      filename: 'signup.html',
      chunks: ['signup'],
      hash: true,
    }),
    new HtmlWebpackPlugin({
      template: './profile.html',
      filename: 'profile.html',
      chunks: ['profile'],
      hash: true,
    }),
  ],
};
