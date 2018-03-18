const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const syspath = require('@config/syspath');
const webpackCommon = require('./common');

module.exports = function clientConfig(env, args = {}) {
  const isDev = args.mode !== 'production';
  const configName = 'client';
  const commonConfig = webpackCommon(configName, isDev);
  const jsFilename = isDev ? '[name].js' : '[name].[chunkhash].js';

  return {
    mode: args.mode || 'production',
    target: 'web',
    name: configName,
    context: commonConfig.context,
    devtool: commonConfig.devtool,
    resolve: commonConfig.resolve,
    performance: { hints: false },
    stats: { entrypoints: false, children: false },
    entry: {
      main: [
        '@babel/polyfill',
        ...(isDev
          ? ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000']
          : []),
        './app/index.js'
      ],
      vendor: ['react', 'react-dom', 'react-router-dom', 'redux', 'react-redux']
    },
    output: {
      path: syspath.public,
      publicPath: commonConfig.publicPath,
      chunkFilename: jsFilename,
      filename: jsFilename
    },
    module: {
      rules: [
        ...commonConfig.babelRule(),
        ...commonConfig.fileRule(),
        ...commonConfig.cssModulesRule(MiniCssExtractPlugin),
        ...commonConfig.globalStylesRule(MiniCssExtractPlugin)
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          common: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            minChunks: 2,
            enforce: true
          }
        }
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: isDev ? 'global.css' : 'global.[chunkhash].css',
        chunkFilename: isDev ? '[name].css' : '[name].[chunkhash].css'
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
            new StatsPlugin('stats.json', {
              chunkModules: true,
              exclude: [/node_modules[\\\/]react/]
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
};
