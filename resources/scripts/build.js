// first and foremost, specify NODE_ENV variable
process.env.NODE_ENV = 'production';
// enable analyze webpack bundles
const argv = process.argv.slice(2)[0];
if (argv === '--analyze') {
  process.env.ANALYZE_MODE = 'enabled';
}

require('make-promises-safe');
// clean files before proceeding
require('./clean');
// include env script to load targeted environment file
require('./env');

const colors = require('colors');
const slash = require('slash');
const webpack = require('webpack');
const webpackConfig = require('../webpack/config');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

const clientConfig = webpackConfig[0];
const serverConfig = webpackConfig[1];

const webpackBuild = () => {
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
};

webpackBuild()
  .then(() => {
    console.log(colors.green('Webpack compiled successfully.'));
    console.log();
    console.log(
      colors.cyan(
        `[CLIENT] Output location: ${slash(clientConfig.output.path)}`
      )
    );
    console.log(
      colors.cyan(
        `[SERVER] Output location: ${slash(serverConfig.output.path)}`
      )
    );
  })
  .catch(error => {
    console.log(colors.red('ERROR: Webpack failed to compile.'));
    console.log(colors.red(error));
    process.exit(1);
  });

module.exports = webpackBuild;
