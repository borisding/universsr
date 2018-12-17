const DEV = require('isdev');
const SYSPATH = require('@config/syspath');
const pkg = require('@root/package');

module.exports = function commonConfig(target) {
  const isClient = target === 'client';
  const devtool = DEV ? 'cheap-module-inline-source-map' : 'source-map';
  const cssScopedName = DEV ? '[local]___[hash:base64:5]' : '[hash:base64:5]';
  const publicPath = '/';

  // the style loaders for both css modules and global style
  const getStyleLoaders = (ExtractCssChunks, cssLoaderOptions = {}) => {
    const sourceMap = !!DEV && !!isClient;

    return [
      ...(ExtractCssChunks ? [ExtractCssChunks.loader] : []),
      {
        loader: 'css-loader',
        options: Object.assign(
          {
            sourceMap,
            importLoaders: 2
          },
          cssLoaderOptions
        )
      },
      {
        loader: 'postcss-loader',
        options: { sourceMap }
      },
      {
        loader: 'sass-loader',
        options: { sourceMap }
      }
    ];
  };

  // file loaders for both images and fonts
  const getFileLoaders = options => {
    return [
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
  };

  return {
    devtool,
    publicPath,
    context: SYSPATH['SRC'],
    mode: DEV ? 'development' : 'production',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
      alias: pkg._moduleAliases
    },
    getBabelRule() {
      return {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            compact: false,
            cacheDirectory: !!DEV,
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: isClient ? false : 'commonjs',
                  useBuiltIns: 'entry'
                }
              ],
              '@babel/preset-react'
            ],
            // babel plugins, read more on babel's stage presets blog post:
            // @see: https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets
            plugins: [
              'react-hot-loader/babel',
              'universal-import',
              '@babel/plugin-transform-strict-mode',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties',
              [
                'react-css-modules',
                {
                  exclude: 'global.s?css', // need to exclude the defined global CSS file
                  context: SYSPATH['SRC'], // must match with webpack's context
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
            // environment specific
            env: {
              production: {
                plugins: ['transform-react-remove-prop-types']
              }
            }
          }
        }
      };
    },
    // this is for us to import local CSS modules from `src`, except global CSS file
    // Note: CSS class names are assigned to `styleName` property where
    // `babel-plugin-react-css-modules` plugin will take care of it and do the matching
    getCssModulesRule(ExtractCssChunks = null) {
      return {
        test: /\.s?css$/,
        exclude: /global\.s?css/,
        use: getStyleLoaders(ExtractCssChunks, {
          modules: true,
          localIdentName: cssScopedName
        })
      };
    },
    // this is for us to use global styles imported in `global.css` or `global.scss` file
    // Note: we assign global CSS class names to `className` property instead of `styleName`
    getGlobalStylesRule(ExtractCssChunks = null) {
      return {
        test: /global\.s?css$/,
        use: getStyleLoaders(ExtractCssChunks)
      };
    },
    getImagesRule() {
      return {
        test: /\.(svg|png|jpe?g|gif)(\?.*)?$/i,
        use: getFileLoaders({ name: 'images/[name].[ext]' })
      };
    },
    getFontsRule() {
      return {
        test: /\.(eot|ttf|woff2?)(\?.*)?$/i,
        use: getFileLoaders({ name: 'fonts/[name].[ext]' })
      };
    }
  };
};
