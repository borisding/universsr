const fs = require('fs');
const isDev = require('isdev');
const webpack = require('webpack');
const webpackCommon = require('./common');
const syspath = require('../../config/syspath');

const externalRegExp = /\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/;
const nodeExternals = fs
  .readdirSync(`${syspath.root}/node_modules`)
  .filter(x => !externalRegExp.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});

const serverConfig = {
  name: 'server',
  target: 'node',
  context: webpackCommon.context,
  devtool: webpackCommon.devtool,
  node: {
    __filename: false,
    __dirname: false
  },
  externals: nodeExternals,
  entry: [webpackCommon.polyfill, './server/index.js'],
  output: {
    path: `${syspath.src}/server`,
    libraryTarget: 'commonjs2',
    filename: 'index-built.js'
  },
  resolve: webpackCommon.resolve,
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
            plugins: webpackCommon.babelPlugins
          }
        }
      },
      {
        test: /\.s?css$/,
        include: /node_modules/,
        exclude: syspath.src,
        use: ['css-loader', 'sass-loader']
      },
      {
        test: /\.s?css$/,
        exclude: [/node_modules/, /public/],
        use: [
          {
            loader: 'css-loader/locals',
            options: {
              modules: true,
              localIdentName: webpackCommon.cssScopedName
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      ...webpackCommon.fileLoaders(false)
    ]
  },
  plugins: [
    ...webpackCommon.plugins,
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
};

module.exports = serverConfig;
