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
  resolve: webpackCommon.resolve,
  entry: [webpackCommon.polyfill, './server/index.js'],
  output: {
    path: `${syspath.src}/server`,
    libraryTarget: 'commonjs2',
    filename: 'index-built.js'
  },
  module: {
    rules: [
      ...webpackCommon.babelRule(),
      ...webpackCommon.fileRule(),
      ...webpackCommon.cssModulesRule(),
      ...webpackCommon.globalStylesRule()
    ]
  },
  plugins: [
    ...webpackCommon.plugins(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
  ]
};

module.exports = serverConfig;
