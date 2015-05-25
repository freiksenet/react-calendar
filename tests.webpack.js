// From https://github.com/justinwoo/react-karma-webpack-testing

var context = require.context('./tests', true, /spec.js$/);
context.keys().forEach(context);
