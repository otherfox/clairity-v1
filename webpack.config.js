var HtmlPlugin = require('html-webpack-plugin');

var path = require('path');
var webpack = require('webpack');

module.exports = {
  //devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    filename: 'index.[hash].js',
    path: __dirname + '/bin'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.less']
  },
  module: {
    loaders: [
      {test: /src.*\.jsx?$/, loaders: ['react-hot', 'babel-loader?optional=runtime&stage=1']},
      {test: /src.*\.json$/, loaders: ['json-loader']},
      {test: /src.*\.less$/,  loader: 'style-loader!css-loader!less-loader'},
      {test: /src.*\.(ttf|woff)$/, loader: 'url-loader?limit=100000' },
			{test: /node_modules.*\.(ttf|woff)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: [
    new HtmlPlugin({ title: 'Clairity', filename: 'index.html' }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};
