const isDev = require('isdev');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StatsWebpackPlugin = require('stats-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const syspath = require('@config/syspath');
const webpackCommon = require('./common');

const commonConfig = webpackCommon('client', isDev);
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
    ...(isDev
      ? [
          'eventsource-polyfill', // used for IE's hot reloading
          'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'
        ]
      : []),
    './app/container.js'
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
    minimizer: [new UglifyJsPlugin()],
    runtimeChunk: {
      name: 'bootstrap'
    },
    splitChunks: {
      chunks: 'all' // all types of chunks
    }
  },
  module: {
    rules: [
      ...commonConfig.babelRule(),
      ...commonConfig.fileRule(),
      ...commonConfig.cssModulesRule(ExtractCssChunks),
      ...commonConfig.globalStylesRule(ExtractCssChunks)
    ]
  },
  plugins: [
    new ExtractCssChunks({
      hot: isDev,
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
          new OptimizeCssAssetsPlugin(),
          // moved to public and with minification only
          new HtmlWebpackPlugin({
            inject: false,
            template: `!!raw-loader!${syspath.resources}/views/index.ejs`,
            filename: `${syspath.public}/views/index.ejs`,
            minify: { collapseWhitespace: true, removeComments: true }
          }),
          new HtmlWebpackPlugin({
            inject: false,
            template: `!!raw-loader!${syspath.resources}/views/500.ejs`,
            filename: `${syspath.public}/views/500.ejs`,
            minify: { collapseWhitespace: true, removeComments: true }
          }),
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
