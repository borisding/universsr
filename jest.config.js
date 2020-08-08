module.exports = {
  setupFiles: ['<rootDir>/env.loader.js'],
  coverageDirectory: '<rootDir>/assets/coverage',
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/assets/mocks/file.js',
    '\\.(css|scss)$': '<rootDir>/assets/mocks/style.js'
  },
  testEnvironment: 'node',
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.jsx?$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/']
};
