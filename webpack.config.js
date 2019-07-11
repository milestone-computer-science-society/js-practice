// Webpack Configuration

const path = require('path');

module.exports = {
  mode: 'development',

  entry: ['babel-polyfill', './src/main.js'],

  output: {
    path: path.join(__dirname, '/'),
    filename: 'dist/bundle.js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [ { loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' } ]
      }
    ]
  }

};
