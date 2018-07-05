const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const syspath = require('@config/syspath');
const pkg = require('@root/package');

module.exports = function commonConfig(target, isDev) {
  const isClient = target === 'client';
  const devtool = isDev ? 'cheap-module-inline-source-map' : 'source-map';
  const cssScopedName = isDev ? '[local]___[hash:base64:5]' : '[hash:base64:5]';
  const publicPath = '/';

  return {
    devtool,
    publicPath,
    context: syspath.src,
    mode: process.env.NODE_ENV || 'production',
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
                    targets: { node: 'current' },
                    modules: isClient ? false : 'commonjs',
                    debug: false,
                    loose: true,
                    useBuiltIns: false
                  }
                ],
                ['@babel/preset-stage-2', { decoratorsLegacy: true }],
                '@babel/preset-react'
              ],
              plugins: [
                'universal-import',
                [
                  'react-css-modules',
                  {
                    exclude: 'node_modules',
                    context: syspath.src, // must match with webpack's context
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
    cssModulesRule: (MiniCssExtractPlugin = null) => {
      const modules = true;
      const localIdentName = cssScopedName;
      const sourceMap = !!isDev;

      return [
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
          use:
            isClient && MiniCssExtractPlugin
              ? [
                  MiniCssExtractPlugin.loader, // (note: HMR is not supported in plugin for now)
                  {
                    loader: 'css-loader',
                    options: {
                      modules,
                      localIdentName,
                      sourceMap,
                      minimize: !isDev
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
    globalStylesRule: (MiniCssExtractPlugin = null) => {
      const sourceMap = !!isDev;
      const loaders = [
        {
          loader: 'css-loader',
          options: {
            sourceMap,
            minimize: !isDev
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap
          }
        }
      ];

      if (isClient && MiniCssExtractPlugin.loader) {
        loaders.unshift(MiniCssExtractPlugin.loader);
      }

      return [
        {
          test: /\.s?css$/,
          // specify package name to be imported as global style
          include: [/react-s-alert/],
          exclude: syspath.src,
          use: loaders
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
    }
  };
};
