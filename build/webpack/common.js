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
    mode: isDev ? 'development' : 'production',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
      alias: pkg._moduleAliases
    },
    babelRule: () => {
      // babel presets and options
      const presets = [
        [
          '@babel/preset-env',
          {
            modules: isClient ? false : 'commonjs',
            useBuiltIns: 'entry'
          }
        ],
        '@babel/preset-react'
      ];

      // babel plugins, read more on babel's stage presets blog post:
      // @see: https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets
      const plugins = [
        'react-hot-loader/babel',
        'universal-import',
        '@babel/plugin-transform-strict-mode',
        '@babel/plugin-syntax-dynamic-import',
        '@babel/plugin-proposal-class-properties',
        [
          'react-css-modules',
          {
            exclude: 'global.s?css', // need to exclude the defined global CSS file
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
      ].concat(!isDev ? ['transform-react-remove-prop-types'] : []);

      return [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              compact: false,
              cacheDirectory: !!isDev,
              presets,
              plugins
            }
          }
        }
      ];
    },
    // this is for us to import local CSS modules from `src`, except global CSS file
    // Note: CSS class names are assigned to `styleName` property where
    // `babel-plugin-react-css-modules` plugin will take care of it and do the matching
    cssModulesRule: (ExtractCssChunks = null) => {
      const modules = true;
      const localIdentName = cssScopedName;
      const sourceMap = !!isDev;

      return [
        {
          test: /\.s?css$/,
          exclude: /global\.s?css/,
          use: isClient
            ? [
                ExtractCssChunks.loader,
                {
                  loader: 'css-loader',
                  options: {
                    modules,
                    localIdentName,
                    sourceMap,
                    importLoaders: 2
                  }
                },
                {
                  loader: 'postcss-loader',
                  options: {
                    sourceMap,
                    plugins: () => [autoprefixer]
                  }
                },
                {
                  loader: 'sass-loader',
                  options: { sourceMap }
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
    // this is for us to use global styles imported in `global.css` or `global.scss` file
    // Note: we assign global CSS class names to `className` property instead of `styleName`
    globalStylesRule: (ExtractCssChunks = null) => {
      const sourceMap = !!isDev;

      return [
        {
          test: /global\.s?css$/,
          use: (isClient ? [ExtractCssChunks.loader] : []).concat([
            {
              loader: 'css-loader',
              options: {
                sourceMap,
                importLoaders: 2
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap,
                plugins: () => [autoprefixer]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap
              }
            }
          ])
        }
      ];
    },
    fileRule: () => {
      const loaders = options => [
        {
          loader: 'url-loader',
          options: Object.assign(
            {
              publicPath,
              fallback: 'file-loader',
              limit: 10240,
              emitFile: !!isClient
            },
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
