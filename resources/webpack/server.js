const fs = require('fs');
const webpack = require('webpack');
const { SYSPATH } = require('@config');
const webpackCommon = require('./common');

const commonConfig = webpackCommon('server');

// custom externals for node
const externalRegExp = /\.bin|react-universal-component|webpack-flush-chunks/;
const nodeExternals = fs
  .readdirSync(`${SYSPATH['ROOT']}/node_modules`)
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
  entry: ['regenerator-runtime/runtime', './app/server.js'],
  output: {
    path: `${SYSPATH['SRC']}/app`,
    libraryTarget: 'commonjs2',
    filename: 'serverRenderer.js'
  },
  node: {
    __filename: false,
    __dirname: false
  },
  module: {
    rules: [
      commonConfig.getBabelRule(),
      commonConfig.getImagesRule(),
      commonConfig.getFontsRule(),
      commonConfig.getCssModulesRule(),
      commonConfig.getGlobalStylesRule()
    ]
  },
  plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })]
};
