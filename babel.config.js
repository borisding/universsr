const { isNode, isTest } = require('./config');
const { localScopedName } = require('./package');
const webpackConfig = require('./webpack.config');

function babelConfig() {
  const presets = [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage',
        targets: !isNode
          ? { browsers: 'last 2 versions', ie: 11 }
          : { node: 'current' }
      }
    ],
    '@babel/preset-react'
  ];

  const plugins = [
    'universal-import',
    '@babel/plugin-transform-strict-mode',
    '@babel/plugin-proposal-class-properties',
    [
      'react-css-modules',
      {
        exclude: 'node_modules',
        context: webpackConfig[0].context, // must match with webpack's context
        generateScopedName: isTest ? '[local]' : localScopedName,
        filetypes: {
          '.scss': {
            syntax: 'postcss-scss',
            plugins: ['postcss-nested']
          }
        }
      }
    ]
  ];

  const env = {
    development: {
      plugins: ['react-hot-loader/babel', ...plugins]
    },
    production: {
      plugins: ['transform-react-remove-prop-types', ...plugins]
    },
    test: {
      plugins: [
        [
          'babel-plugin-webpack-alias',
          {
            config: webpackConfig,
            findConfig: true
          }
        ],
        ...plugins
      ]
    }
  };

  return {
    presets,
    plugins,
    env
  };
}

module.exports = babelConfig();
