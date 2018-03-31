/* eslint-disable no-var, strict, prefer-arrow-callback */
"use strict";

var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

var packageJson = require("./package.json");
var vendorDependencies = Object.keys(packageJson["dependencies"]);
var mainEntry = "./examples/ts/index.tsx";
var plugins = [
  new HtmlWebpackPlugin({
    template: "examples/ts/index.html", // Load a custom template (lodash by default see the FAQ for details)
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    // filename: "vendor.js"
    // (Give the chunk a different name)

    minChunks: Infinity,
    // (with more entries, this ensures that no other module
    //  goes into the vendor chunk)
  }),
];

if (process.env.EXAMPLE_TO_COMPILE === 'js') {
  mainEntry = "./examples/js/index.js"
}

if (process.env.EXAMPLE_TO_COMPILE === 'ts') {
  plugins.push(new ForkTsCheckerWebpackPlugin({
    tslint: true,
    watch: ["./examples/ts", "./test"], // optional but improves performance (less stat calls)
  }));
}

module.exports = {
  cache: true,
  entry: {
    main: mainEntry,
    vendor: vendorDependencies,
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
    chunkFilename: "[chunkhash].js",
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          {
            loader: "@epegzz/sass-vars-loader", // read Sass vars from file or options
            options: {
              files: [path.resolve(__dirname, "examples/ts/styles/colors.js")],
            },
          },
        ],
      },
      {
        test: /\.svg/,
        use: [{ loader: "svg-sprite-loader", options: { symbolId: "[name]" } }],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
        ],
      },
    ],
  },
  plugins,
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
  },
  devtool: "source-map",
};
