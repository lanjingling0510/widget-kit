let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */
let path = require('path');
let ROOT_PATH = process.cwd();

module.exports = {
  entry: './src/index.js',

  output: {
    filename: '[name].bundle.js',
    path: path.join(ROOT_PATH, 'dist')
  },

  devtool: 'cheap-module-inline-source-map',

  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    host: '0.0.0.0'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              config: { path: path.join(__dirname, 'postcss.config.js') }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    }),

    new HtmlWebpackPlugin({
      title: 'flv',
      template: 'examples/index.html',
      inject: 'body'
    })
  ]
};
