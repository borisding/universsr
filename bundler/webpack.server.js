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

const serverConfig = {
  target: 'node',
  name: 'server',
  context: paths.app,
  mode: commonConfig.mode,
  devtool: commonConfig.devtool,
  resolve: commonConfig.resolve,
  externals: nodeExternals,
  entry: './ssr.js',
  output: {
    path: paths.build,
    publicPath: commonConfig.publicPath,
    libraryTarget: 'commonjs2',
    filename: 'ssr.js'
  },
  node: {
    __filename: true,
    __dirname: true
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

export default serverConfig;
