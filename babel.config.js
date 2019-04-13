module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    '@babel/plugin-transform-strict-mode',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties'
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-react'
      ],
      plugins: [
        'dynamic-import-node-babel-7',
        [
          'babel-plugin-webpack-alias',
          {
            config: './webpack.config.js',
            findConfig: true
          }
        ],
        [
          'react-css-modules',
          {
            context: './app',
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
