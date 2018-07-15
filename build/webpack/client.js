const isDev = require('isdev');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const syspath = require('@config/syspath');
const webpackCommon = require('./common');

const commonConfig = webpackCommon('client', isDev);

module.exports = {
  target: 'web',
  name: 'client',
  mode: commonConfig.mode,
  context: commonConfig.context,
  devtool: commonConfig.devtool,
  resolve: commonConfig.resolve,
  performance: { hints: false },
  entry: {
    main: [
      ...(isDev
        ? ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000']
        : []),
      '@babel/polyfill',
      './app/index.js'
    ]
  },
  output: {
    path: syspath.public,
    publicPath: commonConfig.publicPath,
    filename: isDev ? '[name].js' : '[name].[contenthash].js',
    chunkFilename: isDev ? '[id].js' : '[id].[contenthash].js'
  },
  optimization: {
    runtimeChunk: {
      name: 'bootstrap'
    },
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [
      ...commonConfig.babelRule(),
      ...commonConfig.fileRule(),
      ...commonConfig.jsonToJsRule(),
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
          new OptimizeCssAssetsPlugin(),
          // moved to public and with minification only
          new HtmlWebpackPlugin({
            inject: false,
            template: `!!raw-loader!${syspath.resources}/views/index.ejs`,
            filename: `${syspath.public}/index.ejs`,
            minify: { collapseWhitespace: true, removeComments: true }
          }),
          new StatsWriterPlugin({
            fields: null,
            transform(data) {
              return JSON.stringify(data);
            }
          }),
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
