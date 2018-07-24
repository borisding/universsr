const isDev = require('isdev');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const syspath = require('@config/syspath');
const webpackCommon = require('./common');

const commonConfig = webpackCommon('server', isDev);

module.exports = {
  target: 'node',
  name: 'server',
  mode: commonConfig.mode,
  context: commonConfig.context,
  devtool: commonConfig.devtool,
  resolve: commonConfig.resolve,
  externals: [
    nodeExternals({
      whitelist: [
        'react-universal-component',
        'require-universal-module',
        'webpack-flush-chunks',
        /\.bin/
      ]
    })
  ],
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
