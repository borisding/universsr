const isDev = require('isdev');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const commonConfig = require('./webpack-common');
const syspath = require('../config/syspath');

const bundleFilename = isDev ? '[name].js' : '[name].[chunkhash].js';

const clientConfig = {
  name: 'client',
  target: 'web',
  context: commonConfig.context,
  devtool: commonConfig.devtool,
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
    publicPath: commonConfig.publicPath,
    path: `${syspath.public}/dist`,
    chunkFilename: bundleFilename,
    filename: bundleFilename
  },
  resolve: commonConfig.resolve,
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
            plugins: commonConfig.babelPlugins.concat(
              isDev ? ['react-hot-loader/babel'] : []
            )
          }
        }
      },
      {
        test: /\.s?css$/,
        use: ExtractCssChunks.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: commonConfig.cssScopedName,
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
      ...commonConfig.fileLoaders()
    ]
  },
  plugins: [
    ...commonConfig.plugins,
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap', 'vendor'], // needed to put webpack bootstrap code before chunks
      filename: bundleFilename,
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([
      {
        from: `${syspath.resources}/assets/manifest.json`,
        to: `${syspath.public}/dist`
      },
      {
        from: `${syspath.resources}/assets/icons`,
        to: `${syspath.public}/dist/icons`
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
            filename: `${syspath.public}/dist/index.ejs`,
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
            publicPath: commonConfig.publicPath,
            relativePaths: false, // to allow using publicPath
            ServiceWorker: { events: true }, // use ServiceWorker for offline usage
            AppCache: false, // disable for AppCache
            cacheMaps: [{ requestTypes: ['navigate', 'same-origin'] }]
          })
        ]
  )
};

module.exports = clientConfig;
