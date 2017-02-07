'use strict';
const path = require("path");
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
module.exports = {
  context: __dirname + "/lib",
  entry: "./index.jsx",
  devtool: 'source-map',
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  module:{
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [nodeModulesPath],
        loader: 'babel-loader',
        query: {
          presets: ['react','es2015']
        }
      }
    ]
  }

}
