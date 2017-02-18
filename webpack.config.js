var path = require('path');

module.exports = {
  entry: './public/components/index.js',
  output: {
    path: __dirname + './public',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        loaders: [
          'babel-loader?presets[]=react,presets[]=es2015'
        ],
      }
    ]
  }
}
//