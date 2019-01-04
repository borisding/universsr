module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-strict-mode',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties'
  ],
  env: {
    test: {
      plugins: [
        'dynamic-import-node-babel-7',
        [
          'babel-plugin-webpack-alias',
          {
            config: './resources/webpack/config.js',
            findConfig: true
          }
        ],
        [
          'react-css-modules',
          {
            context: './src',
            exclude: 'node_modules',
            generateScopedName: '[local]',
            filetypes: {
              '.scss': {
                syntax: 'postcss-scss',
                plugins: ['postcss-nested']
              }
            }
          }
        ]
      ]
    }
  }
};
