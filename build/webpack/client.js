const isDev = require('isdev');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const webpackCommon = require('./common');
const syspath = require('../../config/syspath');

const bundleFilename = isDev ? '[name].js' : '[name].[chunkhash].js';
const extractCssChunks = new ExtractCssChunks();
const extractText = new ExtractTextPlugin({
  filename: 'global.[contenthash].css',
  disable: !!isDev,
  allChunks: true
});

const clientConfig = {
  name: 'client',
  target: 'web',
  context: webpackCommon.context,
  devtool: webpackCommon.devtool,
  resolve: webpackCommon.resolve,
  entry: {
    main: [
      webpackCommon.polyfill,
      ...(isDev
        ? [
            'react-hot-loader/patch',
            'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
          ]
        : []),
      './client/index.js'
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'react-redux',
      'redux-ready-wrapper'
    ]
  },
  output: {
    publicPath: webpackCommon.publicPath,
    path: syspath.public,
    chunkFilename: bundleFilename,
    filename: bundleFilename
  },
  module: {
    rules: [
      ...webpackCommon.babelRule(false),
      ...webpackCommon.fileRule(true),
      ...webpackCommon.cssModulesRule(extractCssChunks),
      ...webpackCommon.globalStylesRule(extractText)
    ]
  },
  plugins: [
    ...webpackCommon.plugins(),
    extractCssChunks,
    extractText,
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap', 'vendor'], // needed to put webpack bootstrap code before chunks
      filename: bundleFilename,
      minChunks: Infinity
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
      ? [
          new webpack.HotModuleReplacementPlugin(),
          new webpack.NamedModulesPlugin()
        ]
      : [
          // moved to public and with minification only
          new HtmlWebpackPlugin({
            inject: false,
            template: `!!raw-loader!${syspath.resources}/views/index.ejs`,
            filename: `${syspath.public}/index.ejs`,
            minify: {
              collapseWhitespace: true,
              removeComments: true
            }
          }),
          new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            sourceMap: true,
            minimize: true,
            output: { comments: false },
            mangle: { screw_ie8: true },
            compress: {
              screw_ie8: true,
              warnings: false
            }
          }),
          new webpack.HashedModuleIdsPlugin(),
          new StatsPlugin('stats.json'),
          new OfflinePlugin({
            externals: ['/'],
            publicPath: webpackCommon.publicPath,
            relativePaths: false, // to allow using publicPath
            ServiceWorker: { events: true }, // use ServiceWorker for offline usage
            AppCache: false // disable for AppCache
          })
        ]
  )
};

module.exports = clientConfig;
