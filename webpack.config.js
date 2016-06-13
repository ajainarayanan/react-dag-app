var webpack = require('webpack');
var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  context: __dirname + '/src',
  entry: {
    'react-dag': './app.js',
    'vendor': ['react', 'react-dom', 'redux', 'lodash', 'classname', 'node-uuid', 'dag'],
    'html': './index.html'
  },
  module: {
    preLoaders: [
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: "jshint-loader"
      // }
    ],
    loaders: [
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
  jshint: {
      camelcase: true,
      emitErrors: false,
      failOnHint: false,
      reporter: function(errors) { }
  },
  output: {
    filename: './[name].js',
    path: __dirname + '/dist'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.js", Infinity),
    new LodashModuleReplacementPlugin,
    new webpack.optimize.DedupePlugin(),
    new LiveReloadPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //     drop_console: false,
    //     dead_code: true
    //   }
    // })
  ]
};
