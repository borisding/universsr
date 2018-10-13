import fs from 'fs';
import webpack from 'webpack';
import SYSPATH from '@config/syspath';
import webpackCommon from './common';

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

export default {
  target: 'node',
  name: 'server',
  mode: commonConfig.mode,
  context: commonConfig.context,
  devtool: commonConfig.devtool,
  resolve: commonConfig.resolve,
  externals: nodeExternals,
  entry: { m: ['regenerator-runtime/runtime', './app/renderer.js'] },
  output: {
    path: SYSPATH['BUILD'],
    libraryTarget: 'commonjs2',
    filename: 'renderer.js'
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
  plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })]
};
