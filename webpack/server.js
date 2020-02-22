const fs = require('fs');
const webpack = require('webpack');
const webpackCommon = require('./common');
const { syspath } = require('@config');

const commonConfig = webpackCommon('server');
// custom externals for node
const externalRegExp = /\.bin|react-universal-component|webpack-flush-chunks/;
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
  context: syspath.src,
  mode: commonConfig.mode,
  devtool: commonConfig.devtool,
  resolve: commonConfig.resolve,
  externals: nodeExternals,
  entry: './server/renderer.js',
  output: {
    path: syspath.src,
    libraryTarget: 'commonjs2',
    filename: './server/dist/renderer.js'
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
      commonConfig.getStylesRule()
    ]
  },
  plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })]
};
