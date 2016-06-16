var webpack = require('webpack');
var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var HappyPack = require('happypack');

module.exports = {
  context: __dirname + '/src',
  entry: {
    'react-dag': './app.js',
    'vendor': ['react', 'react-dom', 'redux', 'lodash', 'classname', 'node-uuid', 'dag'],
    'html': './index.html'
  },
  module: {
    loaders: [
      {
        test: /node_module\/dagre\/dist\/dagre.core.js/,
        loaders: [
          'imports?this=>window',
          'script'
        ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg|woff|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
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
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify("production"),
        '__DEVTOOLS__': false
      },
    }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js", Infinity),
    new LodashModuleReplacementPlugin,
    new webpack.optimize.DedupePlugin(),
    new LiveReloadPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
        drop_console: false,
        dead_code: true
      },
      output: {
        comments: false
      }
    })
  ]
};
