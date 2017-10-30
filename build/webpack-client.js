const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const fs = require('fs');
const isDev = require('isdev');
const autoprefixer = require('autoprefixer');
const commonConfig = require('./webpack-common');
const pkg = require('../package');
const syspath = require('../config/syspath');

const clientConfig = {
  name: 'client',
  target: 'web',
  context: commonConfig.context,
  devtool: commonConfig.devtool,
  entry: ['./client/index.js'],
  output: {
    publicPath: '/dist/',
    path: `${syspath.public}/dist`,
    filename: `js/${isDev ? 'bundle' : '[name].bundle-[hash]'}.js`
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
            plugins: isDev ? ['react-hot-loader/babel'] : []
          }
        }
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
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
    new ExtractTextPlugin({
      filename: `css/${isDev ? 'screen' : 'screen-[contenthash]'}.css`,
      ignoreOrder: true,
      allChunks: true,
      disable: !!isDev
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
    new AssetsPlugin({
      fullPath: false,
      filename: 'assets.json',
      path: syspath.public
    }),
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
    new webpack.optimize.AggressiveMergingPlugin()
  ]);
}

module.exports = clientConfig;
