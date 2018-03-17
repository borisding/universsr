const fs = require('fs');
const webpack = require('webpack');
const syspath = require('@config/syspath');
const webpackCommon = require('./common');

module.exports = function serverConfig(env, args = {}) {
  const isDev = args.mode !== 'production';
  const configName = 'server';
  const commonConfig = webpackCommon(configName, isDev);

  const externalRegExp = /\.bin|react-universal-component|require-universal-module|webpack-flush-chunks/;
  const nodeExternals = fs
    .readdirSync(`${syspath.root}/node_modules`)
    .filter(x => !externalRegExp.test(x))
    .reduce((externals, mod) => {
      externals[mod] = `commonjs ${mod}`;
      return externals;
    }, {});

  return {
    mode: args.mode || 'development',
    target: 'node',
    name: configName,
    externals: nodeExternals,
    context: commonConfig.context,
    devtool: commonConfig.devtool,
    resolve: commonConfig.resolve,
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
    plugins: [new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 })]
  };
};
