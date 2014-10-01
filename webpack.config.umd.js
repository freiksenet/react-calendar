var webpack = require("webpack");

module.exports = exports = Object.create(require("./webpack.config.js"));

exports.output = Object.create(exports.output);
exports.output.path = 'build';
exports.externals = {
  react: {
    root: "React",
    commonjs: "react",
    commonjs2: "react",
    amd: "react"
  },
  moment: "moment"
};
