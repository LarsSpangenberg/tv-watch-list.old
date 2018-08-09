
require('dotenv').config();// eslint-disable-line import/no-extraneous-dependencies

const express = require('express');
const webpack = require('webpack');// eslint-disable-line import/no-extraneous-dependencies
const webpackDevMiddleware = require('webpack-dev-middleware');// eslint-disable-line import/no-extraneous-dependencies
const webpackHotMiddleware = require('webpack-hot-middleware');// eslint-disable-line import/no-extraneous-dependencies

const app = express();
const config = require('./webpack.config');

const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

app.use(webpackHotMiddleware(compiler));

app.listen(process.env.PORT || 3000, () => {
  console.log(`listening on port ${process.env.PORT || 3000}`);
});
