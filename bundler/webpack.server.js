import fs from 'fs';
import webpack from 'webpack';
import webpackCommon from './webpack.common';
import { paths } from '../utils';

const config = webpackCommon('server');

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
  mode: config.mode,
  devtool: config.devtool,
  resolve: config.resolve,
  externals: nodeExternals,
  entry: './middleware/serverRenderer.js',
  output: {
    path: config.outputPath,
    publicPath: config.publicPath,
    libraryTarget: 'commonjs2',
    filename: 'serverRenderer.js'
  },
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    rules: [
      config.getBabelRule(),
      config.getImagesRule(),
      config.getFontsRule(),
      config.getCssModulesRule(),
      config.getStylesRule()
    ]
  },
  plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })]
};

export default serverConfig;
