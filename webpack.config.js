var HtmlPlugin = require('html-webpack-plugin');

fileExtensions = ['jpg'];

module.exports = {
  context: __dirname,
  entry: './src',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.jsx$/,
        loader: 'baggage-loader?[file].styl',
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ].concat(fileExtensions.map(function(ext) {
      return {
        test: new RegExp('\\.' + ext + '$'),
        loader: 'file-loader',
      };
    })),
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html',
    }),
  ],
};
