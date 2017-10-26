const webpack = require('webpack');
const isDev = require('isdev');
const nodeExternals = require('webpack-node-externals');
const pkg = require('../package');
const syspath = require('../config/syspath');

const serverConfig = {
  name: 'server',
  target: 'node',
  context: syspath.src,
  devtool: 'inline-source-map',
  node: {
    __filename: false,
    __dirname: false
  },
  externals: [nodeExternals()],
  entry: ['babel-polyfill', './server/index.js'],
  output: {
    libraryTarget: 'commonjs2',
    path: `${syspath.src}/server`,
    filename: 'index-built.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              importLoaders: 1,
              modules: true, // enable css modules
              localIdentName: pkg.cssModules.scopedName
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':
        JSON.stringify(process.env.NODE_ENV) || 'development'
    })
  ]
};

module.exports = serverConfig;
