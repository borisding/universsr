import { env } from '../utils';

const { isDev } = env;

export default function webpackCommon(target) {
  const isClient = target === 'client';
  const publicPath = process.env.PUBLIC_PATH || '/';

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
        options: { publicPath }
      });
    }

    return styleLoaders;
  };

  return {
    publicPath,
    mode: isDev ? 'development' : 'production',
    devtool: isDev ? 'cheap-module-source-map' : 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.scss', '.sass']
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
          modules: {
            mode: 'local',
            exportGlobals: true,
            exportOnlyLocals: !isClient,
            localIdentName: isDev
              ? '[path][name]__[local]--[hash:base64:5]'
              : '[hash:base64:5]'
          }
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
        type: 'asset',
        generator: {
          emit: !!isClient
        }
      };
    },
    getFontsRule() {
      return {
        test: /\.(eot|ttf|woff2?)(\?.*)?$/i,
        type: 'asset',
        generator: {
          emit: !!isClient
        }
      };
    }
  };
}
