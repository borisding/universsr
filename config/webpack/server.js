const fs = require('fs');
const webpack = require('webpack');
const webpackCommon = require('./common');
const { syspath } = require('@config');

module.exports = function serverConfig() {
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

  return {
    target: 'node',
    name: 'server',
    mode: commonConfig.mode,
    context: commonConfig.context,
    devtool: commonConfig.devtool,
    resolve: commonConfig.resolve,
    externals: nodeExternals,
    entry: './server.js',
    output: {
      path: syspath.app,
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
};
