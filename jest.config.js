module.exports = {
  setupFiles: ['<rootDir>/env.loader.js'],
  coverageDirectory: '<rootDir>/resources/coverage',
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/resources/jest/fileMock.js',
    '\\.(css|scss|sass|module)$': '<rootDir>/resources/jest/styleMock.js'
  },
  testEnvironment: 'node',
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.jsx?$',
  testPathIgnorePatterns: ['<rootDir>/node_modules/']
};
