import { isDev } from '../config';

export default function commonConfig(target) {
  const isClient = target === 'client';
  const publicPath = process.env.PUBLIC_PATH || '/';
  const devtool = isDev ? 'cheap-module-inline-source-map' : 'source-map';
  const localIdentName = '[local]___[hash:base64:5]';
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
          emitFile: false,
          ...options
        }
      }
    ];
  };

  return {
    devtool,
    publicPath,
    mode: isDev ? 'development' : 'production',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.sass'],
      alias: { 'react-dom': '@hot-loader/react-dom' }
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
    // rule for any local CSS modules from `app`
    getCssModulesRule(MiniCssExtractPlugin = null) {
      return {
        test: /\.module\.(css|scss|sass)$/,
        exclude: /node_modules/,
        use: getStyleLoaders(MiniCssExtractPlugin, {
          modules: { localIdentName },
          onlyLocals: !isClient
        })
      };
    },
    // rule for any regular styles, except CSS modules
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
}
