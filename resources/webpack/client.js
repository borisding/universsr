const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { DEV, SYSPATH } = require('@config');
const getCustomEnvData = require('@resources/scripts/env');
const webpackCommon = require('./common');

const commonConfig = webpackCommon('client');
const isAnalyze = process.env.ANALYZE_MODE === 'enabled';

module.exports = {
  target: 'web',
  name: 'client',
  mode: commonConfig.mode,
  context: commonConfig.context,
  devtool: commonConfig.devtool,
  resolve: commonConfig.resolve,
  // for more about performance hints
  // @see: https://webpack.js.org/configuration/performance/#performance
  performance: {
    maxEntrypointSize: 400000,
    maxAssetSize: 400000
  },
  entry: [
    ...(DEV
      ? [
          'eventsource-polyfill', // used for IE's hot reloading
          'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
        ]
      : []),
    '@babel/polyfill',
    './app/client.js'
  ],
  output: {
    path: SYSPATH['PUBLIC'],
    publicPath: commonConfig.publicPath,
    filename: DEV ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: DEV ? '[id].js' : '[id].[contenthash].js'
  },
  optimization: {
    // can provide uglify-js options for more controls
    // @see: https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
    minimizer: [new UglifyJsPlugin(), new OptimizeCssAssetsPlugin()],
    runtimeChunk: {
      name: 'bootstrap'
    },
    splitChunks: {
      chunks: 'all' // all types of chunks
    }
  },
  module: {
    rules: [
      commonConfig.getBabelRule(),
      commonConfig.getImagesRule(),
      commonConfig.getFontsRule(),
      commonConfig.getCssModulesRule(ExtractCssChunks),
      commonConfig.getGlobalStylesRule(ExtractCssChunks)
    ]
  },
  plugins: [
    new webpack.DefinePlugin(getCustomEnvData().stringified),
    new ExtractCssChunks({
      hot: !!DEV,
      cssModules: true,
      reloadAll: true,
      filename: DEV ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: DEV ? '[id].css' : '[id].[contenthash].css'
    }),
    new CopyWebpackPlugin([
      {
        from: `${SYSPATH['RESOURCES']}/assets/manifest.json`,
        to: SYSPATH['PUBLIC']
      },
      {
        from: `${SYSPATH['RESOURCES']}/assets/icons`,
        to: `${SYSPATH['PUBLIC']}/icons`
      }
    ])
  ].concat(
    DEV
      ? [new webpack.HotModuleReplacementPlugin()]
      : [
          new StatsWebpackPlugin('stats.json'),
          new OfflinePlugin({
            externals: ['/'],
            publicPath: commonConfig.publicPath,
            relativePaths: false, // to allow using publicPath
            ServiceWorker: { events: true }, // use ServiceWorker for offline usage
            AppCache: false // disable for AppCache
          }),
          // for more webpack bundle analyzer options,
          // @see: https://github.com/webpack-contrib/webpack-bundle-analyzer#options-for-plugin
          new BundleAnalyzerPlugin({
            analyzerMode: isAnalyze ? 'server' : 'disabled',
            openAnalyzer: isAnalyze
          })
        ]
  )
};
