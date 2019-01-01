const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OfflinePlugin = require('offline-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { isDev, syspath } = require('@config');
const { getCustomEnv } = require('@scripts/env');
const webpackCommon = require('./common');

const commonConfig = webpackCommon('client');
const isAnalyze = process.env.ANALYZE_MODE === 'enabled';
const stringifiedEnv = getCustomEnv().stringified || {};

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
    ...(isDev
      ? [
          'eventsource-polyfill', // used for IE's hot reloading
          'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
        ]
      : []),
    '@babel/polyfill',
    './app/client.js'
  ],
  output: {
    path: syspath.public,
    publicPath: commonConfig.publicPath,
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDev ? '[id].js' : '[id].[contenthash].js'
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
      commonConfig.getCssModulesRule(MiniCssExtractPlugin),
      commonConfig.getGlobalStylesRule(MiniCssExtractPlugin)
    ]
  },
  plugins: [
    new webpack.DefinePlugin(stringifiedEnv),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css'
    }),
    new CopyWebpackPlugin([
      {
        from: `${syspath.resources}/assets/manifest.json`,
        to: syspath.public
      },
      {
        from: `${syspath.resources}/assets/icons`,
        to: `${syspath.public}/icons`
      }
    ])
  ].concat(
    isDev
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
