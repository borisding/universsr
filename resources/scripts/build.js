// first and foremost, specify NODE_ENV variable
process.env.NODE_ENV = 'production';
// enable analyze webpack bundles
const argv = process.argv.slice(2)[0];
if (argv === '--analyze') {
  process.env.ANALYZE_MODE = 'enabled';
}

// clean files before proceeding
require('./clean');
// include env script to load targeted environment file
require('./env');

const colors = require('colors');
const webpack = require('webpack');
const webpackConfig = require('../webpack/config');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

function webpackBuild() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);
    new SimpleProgressWebpackPlugin().apply(compiler);

    compiler.run((error, stats) => {
      if (error && error.message) {
        return reject(error);
      } else {
        return resolve(stats);
      }
    });
  });
}

webpackBuild()
  .then(() => {
    console.log(colors.green('Webpack compiled successfully.'));
  })
  .catch(error => {
    console.log(colors.red('ERROR: Webpack failed to compile.'));
    console.log(colors.red(error));
    process.exit(1);
  });

module.exports = webpackBuild;
