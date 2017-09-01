const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './react-calendar.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'react-calendar.js',
    library: 'ReactCalendar',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [ /node_modules/, /.less$/, 'demo.js' ]
      },
      // For sample theme
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.css/, loader: 'style-loader!css-loader' },
      { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'file-loader' }
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src')
    ],
    extensions: ['.js', '.css']
  },
  devtool: 'inline-source-map',
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    moment: 'moment'
  },
  performance: {
    hints: "warning",
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
    assetFilter: function(assetFilename) {
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  },
  devServer: {
    proxy: { // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true
  },
};
