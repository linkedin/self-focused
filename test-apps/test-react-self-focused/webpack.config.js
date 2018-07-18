const path = require('path');

module.exports = {
  entry: './example/index-esnext.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'example')
  },
  devServer: {
    historyApiFallback: true
  }
};
