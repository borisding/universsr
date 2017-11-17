const webpack = require('webpack');
const isDev = require('isdev');
const config = require('../config/index');
const syspath = require('../config/syspath');

const publicPath = '/';
const cssScopedName = isDev ? '[local]___[hash:base64:5]' : '[hash:base64:5]';

const commonConfig = {
  polyfill: 'babel-polyfill',
  context: syspath.src,
  publicPath,
  cssScopedName,
  devtool: isDev ? 'cheap-module-inline-source-map' : 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
    alias: {
      '@bin': syspath.bin,
      '@build': syspath.build,
      '@config': syspath.config,
      '@public': syspath.public,
      '@resources': syspath.resources,
      '@assets': `${syspath.resources}/assets`,
      '@utils': `${syspath.src}/utils`,
      '@api': `${syspath.src}/api`,
      '@server': `${syspath.src}/server`,
      '@client': `${syspath.src}/client`,
      '@common': `${syspath.src}/client/common`,
      '@modules': `${syspath.src}/client/modules`,
      '@redux': `${syspath.src}/client/redux`,
      '@styles': `${syspath.src}/client/common/styles`
    }
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'development'
      }
    })
  ],
  babelPlugins: [
    'universal-import',
    [
      'react-css-modules',
      {
        context: syspath.src,
        generateScopedName: cssScopedName,
        filetypes: {
          '.scss': {
            syntax: 'postcss-scss',
            plugins: ['postcss-nested']
          }
        }
      }
    ]
  ],
  fileLoaders: (emitFile = true) => {
    return [
      {
        test: /\.(svg|png|jpe?g|gif)(\?.*)?$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath,
              emitFile,
              name: 'images/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff2?)(\?.*)?$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath,
              emitFile,
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ];
  }
};

module.exports = commonConfig;
