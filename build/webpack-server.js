const fs = require('fs');
const path = require('path');
const isDev = require('isdev');
const webpack = require('webpack');
const commonConfig = require('./webpack-common');
const syspath = require('../config/syspath');

const externalRegExp = /\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/;
const nodeExternals = fs
  .readdirSync(path.join(__dirname, '../node_modules'))
  .filter(x => !externalRegExp.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});

const serverConfig = {
  name: 'server',
  target: 'node',
  context: commonConfig.context,
  devtool: commonConfig.devtool,
  node: {
    __filename: false,
    __dirname: false
  },
  externals: nodeExternals,
  entry: [commonConfig.polyfill, './server/index.js'],
  output: {
    path: `${syspath.src}/server`,
    libraryTarget: 'commonjs2',
    filename: 'index-built.js'
  },
  resolve: commonConfig.resolve,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: ['env', 'react', 'stage-2'],
            plugins: commonConfig.babelPlugins
          }
        }
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true, // enable css modules
              localIdentName: commonConfig.cssScopedName
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      ...commonConfig.fileLoaders(false)
    ]
  },
  plugins: [
    ...commonConfig.plugins,
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
};

module.exports = serverConfig;
