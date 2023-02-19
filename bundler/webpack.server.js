import fs from 'fs';
import webpack from 'webpack';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import webpackCommon from './webpack.common';
import { env, paths } from '../utils';

const config = webpackCommon('server');
const { isDev } = env;

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
  entry: './serverRenderer.js',
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

if (isDev) {
  serverConfig.plugins = [
    ...serverConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshPlugin({
      overlay: {
        sockIntegration: 'whm'
      }
    })
  ];
}

export default serverConfig;
