const isDev = require('isdev');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const syspath = require('@config/syspath');
const webpackCommon = require('./common');

const configName = 'client';
const commonConfig = webpackCommon(configName);
const bundleFilename = isDev ? '[name].js' : '[name].[chunkhash].js';
const extractCssChunks = new ExtractCssChunks();
const extractText = new ExtractTextPlugin({
  filename: 'global.[contenthash].css',
  disable: !!isDev,
  allChunks: true
});

const clientConfig = {
  target: 'web',
  name: configName,
  context: commonConfig.context,
  devtool: commonConfig.devtool,
  resolve: commonConfig.resolve,
  entry: {
    main: [
      commonConfig.polyfill,
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
    path: syspath.public,
    publicPath: commonConfig.publicPath,
    chunkFilename: bundleFilename,
    filename: bundleFilename
  },
  module: {
    rules: [
      ...commonConfig.babelRule(),
      ...commonConfig.fileRule(),
      ...commonConfig.cssModulesRule(extractCssChunks),
      ...commonConfig.globalStylesRule(extractText)
    ]
  },
  plugins: [
    ...commonConfig.plugins(),
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
            minify: { collapseWhitespace: true, removeComments: true }
          }),
          new UglifyJSPlugin({
            sourceMap: true,
            uglifyOptions: {
              ie8: false,
              compress: true,
              ecma: 8
            }
          }),
          new webpack.HashedModuleIdsPlugin(),
          new StatsPlugin('stats.json'),
          new OfflinePlugin({
            externals: ['/'],
            publicPath: commonConfig.publicPath,
            relativePaths: false, // to allow using publicPath
            ServiceWorker: { events: true }, // use ServiceWorker for offline usage
            AppCache: false // disable for AppCache
          })
        ]
  )
};

module.exports = clientConfig;
