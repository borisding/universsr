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
    cssModulesRule: (ExtractCssChunks = null) => {
      const modules = true;
      const localIdentName = cssScopedName;
      const sourceMap = !!isDev;

      return [
        {
          test: /\.s?css$/,
          exclude: /node_modules/,
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
    globalStylesRule: (ExtractCssChunks = null) => {
      const sourceMap = !!isDev;

      return [
        {
          test: /\.s?css$/,
          // specify package name to be imported as global style
          include: [/react-s-alert/],
          exclude: syspath.src,
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
    }
  };
};
