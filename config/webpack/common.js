const { isDev, syspath } = require('@config');
const { localScopedName, _moduleAliases } = require('@root/package');

module.exports = function commonConfig(target) {
  const isClient = target === 'client';
  const publicPath = process.env.PUBLIC_PATH || '/';
  const devtool = isDev ? 'cheap-module-inline-source-map' : 'source-map';
  const reloadAll = true; // set to `false` if don't want to reload all for hmr

  // the style loaders for both css modules and global style
  const getStyleLoaders = (MiniCssExtractPlugin, cssLoaderOptions = {}) => {
    const sourceMap = isDev && isClient;
    const styleLoaders = [
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

    if (MiniCssExtractPlugin) {
      styleLoaders.unshift({
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: !!isDev,
          reloadAll
        }
      });
    }

    return styleLoaders;
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
      alias: _moduleAliases
    },
    getBabelRule() {
      return {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: !!isDev,
            configFile: true
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
    // rule for any local CSS modules from `app`
    // Note: CSS class names are assigned to `styleName` property where
    // `babel-plugin-react-css-modules` plugin will take care of it and do the matching
    getCssModulesRule(MiniCssExtractPlugin = null) {
      return {
        test: /\.module\.(css|scss|sass)$/,
        exclude: /node_modules/,
        use: getStyleLoaders(MiniCssExtractPlugin, {
          modules: { localIdentName: localScopedName },
          onlyLocals: !isClient
        })
      };
    },
    // rule for any styles that is not coming from `*.module.(css|scss|sass)`
    getStylesRule(MiniCssExtractPlugin = null) {
      return {
        test: /\.(css|scss|sass)$/,
        exclude: /\.module\.(css|scss|sass)$/,
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
