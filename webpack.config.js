const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  // Entry files for our popup and background pages
  entry: {
    main: "./src/index.js"
  },
  output: {
    library: "sapa",
    libraryTarget: "umd",
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new CompressionPlugin()
  ]
};
