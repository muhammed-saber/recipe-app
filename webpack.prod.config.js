// path.resolve provides absolute path which is required
// in output.path and module.loaders inclusions
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

var moduleConfig = require('./webpack.config.js');

moduleConfig.entry =  './src/index.jsx';

moduleConfig.output = {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js'
};

moduleConfig.plugins = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: '../index.html'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin()
];

module.exports = moduleConfig;
