import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractCssChunks from 'extract-css-chunks-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OfflinePlugin from 'offline-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import StatsWebpackPlugin from 'stats-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import DEV from 'isdev';
import SYSPATH from '@config/syspath';
import webpackCommon from './common';

const commonConfig = webpackCommon('client');
const isAnalyze = process.env.ANALYZE_MODE === 'enabled';

export default {
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
    './app/container.js'
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
      ...commonConfig.babelRule(),
      ...commonConfig.fileRule(),
      ...commonConfig.cssModulesRule(ExtractCssChunks),
      ...commonConfig.globalStylesRule(ExtractCssChunks)
    ]
  },
  plugins: [
    new ExtractCssChunks({
      hot: !!DEV,
      cssModules: true,
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
          // moved to public and with minification only
          new HtmlWebpackPlugin({
            inject: false,
            template: `!!raw-loader!${SYSPATH['RESOURCES']}/views/index.ejs`,
            filename: `${SYSPATH['PUBLIC']}/views/index.ejs`,
            minify: { collapseWhitespace: true, removeComments: true }
          }),
          new HtmlWebpackPlugin({
            inject: false,
            template: `!!raw-loader!${SYSPATH['RESOURCES']}/views/500.ejs`,
            filename: `${SYSPATH['PUBLIC']}/views/500.ejs`,
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
