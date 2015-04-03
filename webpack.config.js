var webpack = require("webpack");

var config = {
  entry: './react-calendar.js',
  output: {
     path: 'dist',
     filename: 'react-calendar.js',
     library: 'ReactCalendar',
     libraryTarget: 'umd'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony'},
      // For sample theme
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      { test: /\.woff$/, loader: "file-loader" },
        { test: /\.woff2$/, loader: "file-loader" },
      { test: /\.ttf$/, loader: "file-loader" },
      { test: /\.eot$/, loader: "file-loader" },
      { test: /\.svg$/, loader: "file-loader" }
    ]
  },
  externals: {
    react: {
      root: "React",
      commonjs: "react",
      commonjs2: "react",
      amd: "react"
    },
    moment: "moment"
  },
  plugins: []
};
//console.log('HUSS %o',process.env);

// TODO activer en local
process.env.REACT_CALENDAR_WEBPACK = 'server';

if (process.env.REACT_CALENDAR_WEBPACK === 'umd_min') {
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin()
  ];
  config.output.path = 'build';
  config.output.filename = config.output.filename.replace(/\.js$/, ".min.js");
} else if (process.env.REACT_CALENDAR_WEBPACK === 'umd') {
  config.output.path = 'build';
} else if (process.env.REACT_CALENDAR_WEBPACK === 'server') {
  config.module.loaders[0] = { test: /\.js$/, loader: 'react-hot!jsx-loader?harmony'};
  config.plugins = [
    new webpack.NoErrorsPlugin()
  ];
} else {
  config.externals.lodash = {
    root: "_",
    commonjs: "lodash",
    commonjs2: "lodash",
    amd: "lodash"
  };
}

module.exports = config;
