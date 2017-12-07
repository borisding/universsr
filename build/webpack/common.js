const isDev = require('isdev');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HeyWatcher = require('hey-watcher');
const config = require('../../config/index');
const syspath = require('../../config/syspath');

const publicPath = '/';
const cssScopedName = isDev ? '[local]___[hash:base64:5]' : '[hash:base64:5]';

const commonConfig = {
  polyfill: 'babel-polyfill',
  context: syspath.src,
  publicPath,
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
      '@redux': `${syspath.src}/client/redux`
    }
  },
  babelRule: (modules = 'commonjs') => {
    return [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [['env', { modules }], 'react', 'stage-2'],
            plugins: [
              'universal-import',
              [
                'react-css-modules',
                {
                  exclude: 'node_modules',
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
            ].concat(isDev ? ['react-hot-loader/babel'] : [])
          }
        }
      }
    ];
  },
  cssModulesRule: (extractCssChunks = null) => {
    const modules = true;
    const localIdentName = cssScopedName;
    const sourceMap = !!isDev;

    return [
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: extractCssChunks
          ? extractCssChunks.extract({
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    modules,
                    localIdentName,
                    sourceMap
                  }
                },
                {
                  loader: 'sass-loader',
                  options: { sourceMap }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap,
                    plugins: () => [autoprefixer]
                  }
                }
              ]
            })
          : [
              {
                loader: 'css-loader/locals',
                options: {
                  modules,
                  localIdentName
                }
              },
              'sass-loader'
            ]
      }
    ];
  },
  globalStylesRule: (extractText = null) => {
    const loaders = ['css-loader', 'sass-loader'];

    return [
      {
        test: /\.s?css$/,
        // specify package name to be imported as global style
        include: [/react-s-alert/],
        exclude: syspath.src,
        use: extractText
          ? extractText.extract({ fallback: 'style-loader', use: loaders })
          : loaders
      }
    ];
  },
  fileRule: (emitFile = false) => {
    const loader = 'file-loader';

    return [
      {
        test: /\.(svg|png|jpe?g|gif)(\?.*)?$/i,
        use: [
          {
            loader,
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
            loader,
            options: {
              publicPath,
              emitFile,
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      }
    ];
  },
  plugins: () => {
    return [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV) || 'development'
        }
      })
    ].concat(isDev ? [new HeyWatcher()] : []);
  }
};

module.exports = commonConfig;
