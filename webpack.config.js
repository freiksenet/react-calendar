var webpack = require('webpack');

var config = {
  devtool: 'inline-source-map',
  entry: './react-calendar.js',
  output: {
    path: 'dist',
    filename: 'react-calendar.js',
    library: 'ReactCalendar',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?presets[]=react,presets[]=es2015,presets[]=stage-0',
        exclude: [ /node_modules/, /.less$/, 'demo.js' ]
      },
      // For sample theme
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
      { test: /\.css/, loader: 'style-loader!css-loader' },
      { test: /\.woff$/, loader: 'file-loader' },
      { test: /\.ttf$/, loader: 'file-loader' },
      { test: /\.eot$/, loader: 'file-loader' },
      { test: /\.svg$/, loader: 'file-loader' }
    ]
  },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    moment: 'moment'
  },
  plugins: []
};

if (process.env.REACT_CALENDAR_WEBPACK === 'umd_min') {
  config.plugins = [
    new webpack.optimize.UglifyJsPlugin()
  ];
  config.output.path = 'build';
  config.output.filename = config.output.filename.replace(/\.js$/, '.min.js');
}

if (process.env.REACT_CALENDAR_WEBPACK === 'umd') {
  config.output.path = 'build';
}

if (process.env.REACT_CALENDAR_WEBPACK === 'server') {
  config.entry = [
    'react-hot-loader/patch',
    './demo.js'
  ];

  config.module.loaders = [
    {
      test: /\.js$/,
      loader: 'babel',
    },
    { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' },
    { test: /\.css/, loader: 'style-loader!css-loader' },
    { test: /\.(woff2?|ttf|eot|svg)$/, loader: 'file-loader' },
  ];


  config.plugins = [
    new webpack.NoErrorsPlugin()
  ];
}

module.exports = config;
