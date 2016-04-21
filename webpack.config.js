var webpack = require('webpack');
var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var fontFiles = [
  __dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.eot',
  __dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.svg',
  __dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
  __dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.woff',
  __dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.woff2',
  __dirname + '/node_modules/font-awesome/fonts/FontAwesome.otf'
];
var cssFiles = [
  __dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css',
  __dirname + '/node_modules/font-awesome/css/font-awesome.min.css'
];
module.exports = {
  context: __dirname + '/src',
  entry: {
    javascript: './app.js',
    html: './index.html',
    css: cssFiles,
    font: fontFiles
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'file?name=styles/[name].[ext]'
      },
      {
        test : /\.(ttf|eot|svg|otf|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]'
      }
    ]
  },
  output: {
    filename: './app.js',
    path: __dirname + '/dist'
  },
  devtool: 'source-map',
  plugins: [
    new LiveReloadPlugin()
  ]
};
