const { isNode } = require('./config');

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
  '@babel/plugin-proposal-class-properties'
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
      ['babel-plugin-webpack-alias', { config: './webpack.config' }],
      ...plugins
    ]
  }
};

module.exports = {
  presets,
  plugins,
  env
};
