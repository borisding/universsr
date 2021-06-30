const presets = [
  [
    '@babel/preset-env',
    {
      corejs: 3,
      useBuiltIns: 'usage'
    }
  ],
  '@babel/preset-react'
];

const plugins = [
  '@loadable/babel-plugin',
  '@babel/plugin-transform-strict-mode',
  '@babel/plugin-proposal-class-properties'
];

const env = {
  development: {
    plugins: ['react-hot-loader/babel', ...plugins]
  },
  production: {
    plugins: ['transform-react-remove-prop-types', ...plugins]
  }
};

module.exports = {
  presets,
  plugins,
  env
};
