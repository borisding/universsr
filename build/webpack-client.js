const isDev = require('isdev');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const commonConfig = require('./webpack-common');
const pkg = require('../package');
const syspath = require('../config/syspath');
const bundleFilename = isDev ? '[name].js' : '[name].[chunkhash].js';

const clientConfig = {
  name: 'client',
  target: 'web',
  context: commonConfig.context,
  devtool: commonConfig.devtool,
  entry: ['./client/index.js'],
  output: {
    publicPath: '/dist/',
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
            plugins: ['universal-import'].concat(
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
                modules: true, // enable css modules
                localIdentName: pkg.cssModules.scopedName,
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
      ...commonConfig.rules
    ]
  },
  plugins: [
    ...commonConfig.plugins,
    new ExtractCssChunks(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['bootstrap'], // needed to put webpack bootstrap code before chunks
      filename: bundleFilename,
      minChunks: Infinity
    }),
    new CopyWebpackPlugin([
      {
        from: `${syspath.src}/resources/assets/icons`,
        to: `${syspath.public}/dist/icons`
      }
    ])
  ]
};

if (isDev) {
  clientConfig.entry.unshift(
    commonConfig.polyfill,
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
  );
  clientConfig.plugins.unshift(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
} else {
  clientConfig.plugins = clientConfig.plugins.concat([
    // moved to public and with minification only
    new HtmlWebpackPlugin({
      inject: false,
      template: `!!raw-loader!${syspath.src}/resources/views/index.ejs`,
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
    new webpack.HashedModuleIdsPlugin()
  ]);
}

module.exports = clientConfig;
