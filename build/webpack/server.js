const fs = require('fs');
const isDev = require('isdev');
const webpack = require('webpack');
const syspath = require('@config/syspath');
const webpackCommon = require('./common');

const configName = 'server';
const commonConfig = webpackCommon(configName);
const externalRegExp = /\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/;
const nodeExternals = fs
  .readdirSync(`${syspath.root}/node_modules`)
  .filter(x => !externalRegExp.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});

const serverConfig = {
  target: 'node',
  name: configName,
  externals: nodeExternals,
  context: commonConfig.context,
  devtool: commonConfig.devtool,
  resolve: commonConfig.resolve,
  entry: [commonConfig.polyfill, './server/index.js'],
  output: {
    path: `${syspath.src}/server`,
    libraryTarget: 'commonjs2',
    filename: 'index-built.js'
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

module.exports = serverConfig;
