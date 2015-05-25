// Modified from https://github.com/justinwoo/react-karma-webpac-testing

var webpack = require('webpack');

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ], //run in Chrome
    frameworks: [ 'mocha' ], //use the mocha test framework
    files: [
      'tests/phantomjs-shims.js',
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack'] //preprocess with webpack and our sourcemap loader
    },
    reporters: [ 'dots' ], //report results in this format
    webpack: { //kind of a copy of your webpack config
      module: {
        loaders: [
          { test: /\.js$/, loader: 'jsx-loader?harmony' }
        ]
      }
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};