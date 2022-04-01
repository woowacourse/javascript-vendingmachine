const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const dotenv = require('dotenv');

module.exports = (env, options) => {
  dotenv.config({ path: `.env.${options.mode}` });
  return {
    mode: options.mode,
    entry: './src/index.ts',
    resolve: {
      extensions: ['.js', '.css', '.ts'],
    },
    devServer: {
      port: 9000,
      historyApiFallback: true,
      proxy: {
        '/api/*': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/api': '' },
        },
      },
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
        {
          test: /\.png$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
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
      new CopyPlugin({
        patterns: [{ from: 'public', to: '' }],
      }),
    ],
  };
};
