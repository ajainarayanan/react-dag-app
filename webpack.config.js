var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var plugins =
[
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
  new CopyWebpackPlugin([{
    from: './index.html',
    to: 'index.html'
  }])
];
if (process.env.NODE_ENV === 'production') {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
        dead_code: true
      },
      output: {
        comments: false
      }
    })
  );
}
module.exports = {
  context: __dirname + '/src',
  entry: {
    'react-dag-app': './app.js',
    'vendor': ['react', 'react-dom', 'redux', 'lodash', 'classname', 'node-uuid', 'react-dag', 'redux-undoredo']
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
  plugins
};
