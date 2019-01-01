'use strict';

// first and foremost, specify NODE_ENV variable
process.env.NODE_ENV = 'production';

require('make-promises-safe');
// include env script to load targeted environment file
require('./env');

const fs = require('fs');
const colors = require('colors');
const slash = require('slash');
const { spawn, getArgv } = require('./utils');
const { syspath } = require('../config');
const webpackConfig = require('../resources/webpack/config');

const argv = getArgv();
const expectedArgv = ['--app', '--api'];
const isProdApp = argv[0] === expectedArgv[0];
const isProdApi = argv[0] === expectedArgv[1];

if (!isProdApi && !isProdApp) {
  console.log(
    colors.red(
      `Expected argument vectors for production environment: ==> ${expectedArgv}`
    )
  );
  process.exit(1);
}

// simply check both client and server build output dir/file does exist
// before running app server for production environment
if (isProdApp) {
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

if (isProdApp) {
  spawn(`${syspath.root}/app.js`);
} else if (isProdApi) {
  spawn(`${syspath.root}/api.js`);
}
