var path = require('path');
var webpack = require('webpack');

var buildDirectory = './public/';

module.exports = {
  entry: './public/components/index.js',
  devServer: {
    hot: true,
    inline: true,
    port: 3000,
    historyApiFallback: true,
  },
  //output: { path: __dirname + '/public', filename: 'bundle.js' },

  output: {
    path: path.resolve(buildDirectory),
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/public',
  },
  resolve: {
    extensions: ['', '.js','.jsx'],
    alias: {
      webworkify: 'webworkify-webpack',
      'mapbox-gl': path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
    }
  },

  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader?presets[]=react,presets[]=es2015'],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'node_modules/webworkify/index.js'),
        loader: 'worker'
      },
      {
        test: /mapbox-gl.+\.js$/,
        loader: 'transform/cacheable?brfs'
      }
    ]
  },
};
