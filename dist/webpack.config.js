"use strict";

module.exports = {
  // Entry files for our popup and background pages
  entry: {
    sapa: "./src/index.js"
  },
  output: {
    library: "sapa",
    libraryExport: "default",
    libraryTarget: "umd",
    path: __dirname + "/dist"
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }]
  }
};