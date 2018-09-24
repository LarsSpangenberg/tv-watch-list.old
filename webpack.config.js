/* eslint-disable comma-dangle, import/no-dynamic-require */
require('dotenv').config();

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const webpack = require('webpack');

const srcPath = path.resolve(__dirname, 'src');
const buildPath = path.resolve(__dirname, 'dist');


const htmlPlugin = new HtmlWebpackPlugin({
  template: './index.html',
  filename: './index.html',
});

const stylelintPlugin = new StylelintPlugin({
  configFile: '.stylelintrc',
  context: 'src',
  failOnError: false,
  files: '**/*.scss',
  quiet: false,
  syntax: 'scss'
});

module.exports = {
  mode: 'development',
  context: srcPath,
  entry: [
    path.join(srcPath, 'app'),
  ],
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    htmlPlugin,
    stylelintPlugin,
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
    host: 'localhost',
    port: 8000,
    proxy: {
      '/api': `http://localhost:${process.env.PORT || 3000}`
    }
  },
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64:5]',
              sourceMap: true,
              minimize: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: [
                path.resolve(srcPath, 'styles')
              ]
            }
          },
        ]
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: path.resolve(srcPath, 'assets'),
              outputPath: 'img/'
            }
          }
        ]
      },
    ]
  },
  resolve: {
    alias: {
      src: srcPath,
      app: path.resolve(srcPath, 'app'),
      components: path.resolve(srcPath, 'app/components'),
      modules: path.resolve(srcPath, 'app/modules'),
      services: path.resolve(srcPath, 'app/services'),
      types: path.resolve(srcPath, 'app/types'),
      assets: path.resolve(srcPath, 'assets'),
      utils: path.resolve(srcPath, 'app/utils'),
    },
    extensions: ['.js', '.jsx']
  }
};
