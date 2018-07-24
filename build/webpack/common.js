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
    mode: isDev ? 'development' : 'production',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.css', '.scss'],
      alias: pkg._moduleAliases
    },
    babelRule: () => {
      // babel presets
      const presets = [
        ['@babel/preset-env', { modules: isClient ? false : 'commonjs' }],
        [
          '@babel/preset-stage-0',
          { decoratorsLegacy: true, pipelineProposal: 'minimal' }
        ],
        '@babel/preset-react'
      ];

      // babel plugins
      const plugins = [
        'universal-import',
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
      ];

      if (isClient && isDev) plugins.push('react-hot-loader/babel');
      if (!isDev) plugins.push('transform-react-remove-prop-types');

      return [
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              compact: false,
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
            { publicPath, limit: 10240, emitFile: isClient === true },
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
    // common webpack plugins to be used in both client and server
    plugins: () => [
      // this is to replace context which refers require with expression warning
      // we restrict files matching to the `src` directory for the following context
      new webpack.ContextReplacementPlugin(
        /babel-plugin-universal-import|react-universal-component/,
        syspath.src
      )
    ]
  };
};
