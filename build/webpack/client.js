const isDev = require('isdev');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const webpackCommon = require('./common');
const syspath = require('../../config/syspath');

const bundleFilename = isDev ? '[name].js' : '[name].[chunkhash].js';

const clientConfig = {
  name: 'client',
  target: 'web',
  context: webpackCommon.context,
  devtool: webpackCommon.devtool,
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
  resolve: webpackCommon.resolve,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [['env', { modules: false }], 'react', 'stage-2'],
            plugins: webpackCommon.babelPlugins.concat(
              isDev ? ['react-hot-loader/babel'] : []
            )
          }
        }
      },
      {
        test: /\.s?css$/,
        include: /node_modules/,
        exclude: syspath.src,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !!isDev,
                plugins: () => [autoprefixer]
              }
            }
          ]
        })
      },
      {
        test: /\.s?css$/,
        exclude: [/node_modules/, /public/],
        use: ExtractCssChunks.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: webpackCommon.cssScopedName,
                sourceMap: !!isDev
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: !!isDev }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !!isDev,
                plugins: () => [autoprefixer]
              }
            }
          ]
        })
      },
      ...webpackCommon.fileLoaders()
    ]
  },
  plugins: [
    ...webpackCommon.plugins,
    new ExtractCssChunks(),
    new ExtractTextPlugin({
      filename: 'global.[contenthash].css',
      disable: !!isDev,
      allChunks: true
    }),
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
