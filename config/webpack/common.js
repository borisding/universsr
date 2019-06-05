const { isDev, syspath } = require('@config');
const pkg = require('@root/package');

module.exports = function commonConfig(target) {
  const isClient = target === 'client';
  const devtool = isDev ? 'cheap-module-inline-source-map' : 'source-map';
  const cssScopedName = isDev ? '[local]___[hash:base64:5]' : '[hash:base64:5]';
  const reloadAll = true; // set to `false` if don't want to reload all for hmr
  const publicPath = process.env.PUBLIC_PATH || '/';

  // the style loaders for both css modules and global style
  const getStyleLoaders = (MiniCssExtractPlugin, cssLoaderOptions = {}) => {
    const sourceMap = isDev && isClient;
    const cssHotLoader =
      `css-hot-loader?reloadAll=${reloadAll}` +
      `&cssModule=${cssLoaderOptions.modules}`;

    return [
      ...(MiniCssExtractPlugin
        ? [cssHotLoader, MiniCssExtractPlugin.loader]
        : []),
      {
        loader: 'css-loader',
        options: { sourceMap, importLoaders: 2, ...cssLoaderOptions }
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
        options: {
          fallback: 'file-loader',
          publicPath,
          limit: 10240,
          emitFile: !!isClient,
          ...options
        }
      }
    ];
  };

  return {
    devtool,
    publicPath,
    context: syspath.app,
    mode: isDev ? 'development' : 'production',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.sass'],
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
            cacheDirectory: !!isDev,
            presets: [
              [
                '@babel/preset-env',
                {
                  corejs: 3,
                  useBuiltIns: 'usage',
                  modules: isClient ? false : 'commonjs',
                  targets: isClient
                    ? { browsers: 'last 2 versions', ie: 11 }
                    : { node: 'current' }
                }
              ],
              '@babel/preset-react'
            ],
            plugins: [
              'react-hot-loader/babel',
              'universal-import',
              '@babel/plugin-transform-strict-mode',
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-proposal-class-properties',
              [
                'react-css-modules',
                {
                  exclude: 'global.(css|scss|sass)', // need to exclude the defined global CSS file
                  context: syspath.app, // must match with webpack's context
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
    // using webpack loader for react-🔥-dom patch (v16.6+)
    getHotWebpackRule() {
      return {
        test: /\.jsx?$/,
        include: /node_modules/,
        use: ['react-hot-loader/webpack']
      };
    },
    // this is for us to import local CSS modules from `app`, except global CSS file
    // Note: CSS class names are assigned to `styleName` property where
    // `babel-plugin-react-css-modules` plugin will take care of it and do the matching
    getCssModulesRule(MiniCssExtractPlugin = null) {
      return {
        test: /\.module\.(css|scss|sass)$/,
        exclude: /global\.(css|scss|sass)/,
        use: getStyleLoaders(MiniCssExtractPlugin, {
          modules: true,
          exportOnlyLocals: !isClient,
          localIdentName: cssScopedName
        })
      };
    },
    // this is for us to use global styles imported in `global.css` or `global.scss` file
    // Note: we assign global CSS class names to `className` property instead of `styleName`
    getGlobalStylesRule(MiniCssExtractPlugin = null) {
      return {
        test: /global\.(css|scss|sass)$/,
        use: getStyleLoaders(MiniCssExtractPlugin, {
          modules: false
        })
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
