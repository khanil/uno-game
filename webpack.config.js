var path = require('path');

var SRC_PATH = path.resolve(__dirname, "src/app");
var DIST_PATH = path.resolve(__dirname, "public/scripts");

module.exports = {
  entry: "./src/app/index.js",
  output: {
    path: DIST_PATH,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: SRC_PATH,
        loader: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      Components: path.resolve(SRC_PATH, "react/components"),
      Containers: path.resolve(SRC_PATH, "react/containers"),
      Firebase: path.resolve(SRC_PATH, "firebase"),
      Modules: path.resolve(SRC_PATH, "redux/modules")
    }
  },
  devtool: "cheap-eval-source-map"
};