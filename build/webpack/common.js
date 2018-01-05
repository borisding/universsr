const isDev = require('isdev');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HeyWatcher = require('hey-watcher');
const syspath = require('@config/syspath');
const pkg = require('@root/package');

module.exports = function commonConfig(target) {
  const isClient = target === 'client';
  const devtool = isDev ? 'cheap-module-inline-source-map' : 'source-map';
  const cssScopedName = isDev ? '[local]___[hash:base64:5]' : '[hash:base64:5]';
  const publicPath = '/';

  return {
    devtool,
    publicPath,
    context: syspath.src,
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
      alias: pkg._moduleAliases
    },
    babelRule: () => {
      return [
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              compact: false,
              presets: [
                [
                  '@babel/preset-env',
                  {
                    target: { node: 'current' },
                    modules: isClient ? false : 'commonjs',
                    debug: !!isDev,
                    loose: true,
                    useBuiltIns: false
                  }
                ],
                '@babel/preset-react',
                '@babel/preset-stage-2'
              ],
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
              ].concat(isClient && isDev ? ['react-hot-loader/babel'] : [])
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
          use:
            isClient && extractCssChunks
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
          use:
            isClient && extractText
              ? extractText.extract({ fallback: 'style-loader', use: loaders })
              : loaders
        }
      ];
    },
    fileRule: () => {
      const loaders = options => [
        {
          loader: 'file-loader',
          options: Object.assign(
            { publicPath, emitFile: isClient === true },
            options
          )
        }
      ];

      return [
        {
          test: /\.(svg|png|jpe?g|gif)(\?.*)?$/i,
          use: loaders({ name: 'images/[name].[ext]' })
        },
        {
          test: /\.(eot|ttf|woff2?)(\?.*)?$/i,
          use: loaders({ name: 'fonts/[name].[ext]' })
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
};
