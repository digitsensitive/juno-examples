var path = require('path');

module.exports = {
  entry: './src/circ.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader', exclude: '/node_modules/' }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, './'),
    publicPath: '/build/',
    host: '127.0.0.1',
    port: 8080,
    open: true
  },
  resolve: {
    extensions: [".ts",".js"]
  }
};
