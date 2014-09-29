module.exports = {
  entry: './react-calendar.js',
  output: {
     path: 'dist',
     filename: 'react-calendar.js',
     library: 'ReactCalendar',
     libraryTarget: 'commonjs2'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony'}
    ]
  },
  externals: {
    "react": "react"
  },
  plugins: []
};
