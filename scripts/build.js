'use strict';

// first and foremost, specify NODE_ENV variable
process.env.NODE_ENV = 'production';

// enable analyze webpack bundles
const argv = process.argv.slice(2);
if (argv.indexOf('--analyze') !== -1) {
  process.env.ANALYZE_MODE = 'enabled';
}

const progressOptions = [
  '--compact',
  '--minimal',
  '--expanded',
  '--extended',
  '--verbose'
];
// process argv is provided any
const options = { format: progressOptions[0] }; // deafult is compact
const progressArgv = argv.filter(option => progressOptions.includes(option));
if (progressArgv.length > 0) {
  options.format = progressArgv[0].substring(2, progressArgv[0].length);
}

require('make-promises-safe');
// clean files before proceeding
require('./clean');
// include env script to load targeted environment file
require('./env');

const colors = require('colors');
const slash = require('slash');
const webpack = require('webpack');
const webpackConfig = require('../resources/webpack/config');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

const clientConfig = webpackConfig[0];
const serverConfig = webpackConfig[1];

function webpackBuild() {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);
    new SimpleProgressWebpackPlugin(options).apply(compiler);

    compiler.run((error, stats) => {
      if (error) {
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
