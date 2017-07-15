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
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    minChunks: Infinity,
    filename: "vendor.js"
  }),
  new LodashModuleReplacementPlugin,
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
    'vendor': ['react', 'react-dom', 'redux', 'lodash', 'classnames', 'node-uuid', 'react-dag', 'redux-undoredo']
  },
  module: {
    rules: [
      {
        test: /node_module\/dagre\/dist\/dagre.core.js/,
        use: [
          'imports?this=>window',
          'script'
        ]
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: ['file?name=[name].[ext]']
      },
      {
        test: /\.(ttf|eot|svg|woff|woff(2))(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ["file-loader"]
      },
      {
        test: [
          /\.less$/
        ],
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  output: {
    filename: './[name].js',
    path: __dirname + '/dist'
  },
  plugins
};
