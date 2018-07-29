const fs = require('fs');
const isDev = require('isdev');
const webpack = require('webpack');
const syspath = require('@config/syspath');
const webpackCommon = require('./common');

const commonConfig = webpackCommon('server', isDev);

// custom externals for node
const externalRegExp = /\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/;
const nodeExternals = fs
  .readdirSync(`${syspath.root}/node_modules`)
  .filter(x => !externalRegExp.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});

module.exports = {
  target: 'node',
  name: 'server',
  mode: commonConfig.mode,
  context: commonConfig.context,
  devtool: commonConfig.devtool,
  resolve: commonConfig.resolve,
  externals: nodeExternals,
  entry: ['regenerator-runtime/runtime', './app/renderer.js'],
  output: {
    path: `${syspath.src}/app`,
    libraryTarget: 'commonjs2',
    filename: 'renderer-built.js'
  },
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    rules: [
      ...commonConfig.babelRule(),
      ...commonConfig.fileRule(),
      ...commonConfig.cssModulesRule(),
      ...commonConfig.globalStylesRule()
    ]
  },
  plugins: [
    ...commonConfig.plugins(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })
  ]
};
