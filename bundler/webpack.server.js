import fs from 'fs';
import webpack from 'webpack';
import webpackCommon from './webpack.common';
import { paths } from '../utils';

const commonConfig = webpackCommon('server');
// custom externals for node
const externalRegExp = /@loadable\/component/;
const nodeExternals = fs
  .readdirSync(`${paths.root}/node_modules`)
  .filter(x => !externalRegExp.test(x))
  .reduce((externals, mod) => {
    externals[mod] = `commonjs ${mod}`;
    return externals;
  }, {});

export default {
  target: 'node',
  name: 'server',
  context: paths.app,
  mode: commonConfig.mode,
  devtool: commonConfig.devtool,
  resolve: commonConfig.resolve,
  externals: nodeExternals,
  entry: './serverRenderer.js',
  output: {
    path: paths.build,
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
      commonConfig.getStylesRule()
    ]
  },
  plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })]
};
