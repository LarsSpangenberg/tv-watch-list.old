var path = require('path');
var srcPath = path.join(__dirname, 'src');
var buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  mode: 'development',
  context: srcPath,
  entry: path.join(srcPath, 'js', 'client.js'),
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      }
    ]
  }
};
