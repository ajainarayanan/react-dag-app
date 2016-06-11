var webpack = require('webpack');
var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  context: __dirname + '/src',
  entry: {
    'react-dag': './app.js',
    'vendor': ['react', 'react-dom', 'redux', 'lodash', 'classname'],
    'html': './index.html'
  },
  module: {
    loaders: [
      {
        test: require.resolve('jsPlumb'),
        loaders: [
          'imports?this=>window',
          'script'
        ]
      },
      {
        test: /node_module\/dagre\/dist\/dagre.core.js/,
        loaders: [
          'imports?this=>window',
          'script'
        ]
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test:  /\.(ttf|eot|svg|woff|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: [
          /\.less$/
        ],
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          plugins: ['lodash'],
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  output: {
    filename: './[name].js',
    path: __dirname + '/dist'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js", Infinity),
    new LodashModuleReplacementPlugin,
    new webpack.optimize.OccurenceOrderPlugin,
    new LiveReloadPlugin()
  ]
};
