var DefinePlugin = require('webpack').DefinePlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;

fileExtensions = ['jpg'];

module.exports = {
  context: __dirname,
  entry: './src',
  output: {
    path: 'dist',
    filename: '[hash].js',
  },
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
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader!stylus-loader'
        ),
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
    new DefinePlugin({
      BAKED: false,
    }),
    new ExtractTextPlugin('[contenthash].css'),
    new HtmlPlugin({
      template: './src/index.html',
      filename: 'unbaked.html',
    }),
    new UglifyJsPlugin(),
  ],
};
