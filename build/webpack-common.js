const webpack = require('webpack');
const isDev = require('isdev');
const syspath = require('../config/syspath');
const config = require('../config/index');

const commonConfig = {
  polyfill: 'babel-polyfill',
  context: syspath.src,
  devtool: isDev ? 'cheap-module-inline-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
    alias: {
      '@build': syspath.build,
      '@config': syspath.config,
      '@fixtures': syspath.fixtures,
      '@public': syspath.public,
      '@api': `${syspath.src}/api`,
      '@server': `${syspath.src}/server`,
      '@client': `${syspath.src}/client`,
      '@common': `${syspath.src}/client/common`,
      '@modules': `${syspath.src}/client/modules`,
      '@redux': `${syspath.src}/client/redux`,
      '@styles': `${syspath.src}/client/common/styles`
    }
  },
  rules: [
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
  ],
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'development'
      }
    })
  ]
};

module.exports = commonConfig;
