var webpack = require('webpack');
var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var fontFiles = [
  __dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.eot',
  __dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.svg',
  __dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.ttf',
  __dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.woff',
  __dirname + '/node_modules/font-awesome/fonts/fontawesome-webfont.woff2',
  __dirname + '/node_modules/font-awesome/fonts/FontAwesome.otf'
];

module.exports = {
  context: __dirname + '/src',
  entry: {
    app: './app.js',
    html: './index.html',
    'app-styles': './styles/app-styles.less',
    'lib-styles': './styles/lib-styles.less',
    font: fontFiles,
  },
  module: {
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
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
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
    filename: './[name].js',
    path: __dirname + '/dist'
  },
  plugins: [
    new LiveReloadPlugin(),
    new ExtractTextPlugin("styles/[name].css")
  ]
};
