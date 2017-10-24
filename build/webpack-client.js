const webpack = require('webpack');
const fs = require('fs');
const isDev = require('isdev');
const autoprefixer = require('autoprefixer');
const AssetsPlugin = require('assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('../package');
const syspath = require('../config/syspath');
const babel = JSON.parse(fs.readFileSync('./.babelrc'));

const clientConfig = {
  name: 'client',
  target: 'web',
  context: syspath.src,
  entry: [`${syspath.src}/client/index.js`],
  output: {
    publicPath: '/dist/',
    path: `${syspath.public}/dist`,
    filename: `js/${isDev ? 'bundle' : 'bundle-[hash]'}.js`
  },
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
            plugins: isDev
              ? babel.plugins.concat(['react-hot-loader/babel'])
              : babel.plugins
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
      {
        test: /\.(eot|ttf|woff2?)(\?.*)?$/i,
        use: isDev
          ? 'url-loader?name=fonts/[name].[ext]'
          : 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(svg|png|jpe?g|gif)(\?.*)?$/i,
        use: isDev
          ? 'url-loader?name=images/[name].[ext]'
          : 'file-loader?name=images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':
        JSON.stringify(process.env.NODE_ENV) || 'development'
    }),
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
  clientConfig.devtool = 'cheap-module-eval-source-map';
  clientConfig.entry.unshift(
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'
  );
  clientConfig.plugins.unshift(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );
} else {
  clientConfig.devtool = 'source-map';
  clientConfig.plugins = clientConfig.plugins.concat([
    new AssetsPlugin({
      fullPath: false,
      filename: 'assets.json',
      path: syspath.public
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
