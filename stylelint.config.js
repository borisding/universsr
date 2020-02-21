const prettierConfig = require('./prettier.config');

module.exports = {
  plugins: ['stylelint-scss'],
  extends: [
    'stylelint-config-sass-guidelines',
    'stylelint-prettier/recommended'
  ],
  rules: {
    'selector-max-id': 1,
    'selector-class-pattern': null,
    'property-no-unknown': [true, { ignoreProperties: ['composes'] }],
    'prettier/prettier': [true, prettierConfig]
  }
};
