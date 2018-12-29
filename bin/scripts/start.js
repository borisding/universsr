'use strict';

// first and foremost, specify NODE_ENV variable
process.env.NODE_ENV = 'production';

require('make-promises-safe');
// include env script to load targeted environment file
require('./env');

const fs = require('fs');
const colors = require('colors');
const slash = require('slash');
const { spawn, isApi, isApp, checkAppOrApiArgumentsOnly } = require('./utils');
const { SYSPATH } = require('../../config');
const webpackConfig = require('../../resources/webpack/config');

checkAppOrApiArgumentsOnly();

// simply check both client and server build output dir/file does exist
// before running app server for production environment
if (isApp) {
  const checkIfOutputExists = output => {
    if (!fs.existsSync(output)) {
      console.log(
        colors.red(`Action aborted. (${slash(output)}) does not exist.`)
      );
      console.log(
        colors.yellow(
          'Please run `npm run build` script before starting server.'
        )
      );
      process.exit(1);
    }
  };

  const clientConfig = webpackConfig[0];
  const serverConfig = webpackConfig[1];
  [
    clientConfig.output.path,
    `${serverConfig.output.path}/${serverConfig.output.filename}`
  ].forEach(output => checkIfOutputExists(output));
}

if (isApp) {
  spawn(`${SYSPATH['ROOT']}/app.js`);
} else if (isApi) {
  spawn(`${SYSPATH['ROOT']}/api.js`);
}
