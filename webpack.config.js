const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = () => {
  require('dotenv').config({ path: './.env' });

  return {
    mode: 'development',
    entry: './src/index.ts',
    resolve: {
      extensions: ['.js', '.css', '.ts'],
    },
    devtool: 'source-map',
    output: {
      filename: 'bundle.js',
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
      new webpack.DefinePlugin({
        API_URL: JSON.stringify(process.env.API_URL),
      }),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
    ],
    devServer: {
      port: 9000,
      historyApiFallback: true,
    },
  };
};
