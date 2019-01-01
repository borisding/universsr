'use strict';

// first and foremost, specify NODE_ENV variable
process.env.NODE_ENV = 'development';

require('make-promises-safe');
// clean files before proceeding
require('./clean');
// include env script to load targeted environment file
require('./env');

const colors = require('colors');
const nodemon = require('nodemon');
const { spawn, getArgv } = require('./utils');
const { syspath } = require('../../config');

const argv = getArgv();
const expectedArgv = ['--app', '--api'];
const isDevApp = argv[0] === expectedArgv[0];
const isDevApi = argv[0] === expectedArgv[1];

if (!isDevApi && !isDevApp) {
  console.log(
    colors.red(
      `Expected argument vectors for development environment: ==> ${expectedArgv}`
    )
  );
  process.exit(1);
}

// running app server
const runDevApp = () => {
  spawn(`${syspath.root}/app.js`);
};

// running api server
const runDevApi = () => {
  try {
    nodemon({
      script: `${syspath.root}/api.js`,
      watch: [`${syspath.root}/src/api/*`],
      ext: 'js',
      debug: true
    });

    // listening to nodemon events
    nodemon
      .on('restart', files => {
        console.log('API server restarted due to: ', colors.green(files));
      })
      .on('quit', () => {
        console.log('Quit nodemon successfully.');
        process.exit();
      });

    // @see: https://github.com/remy/nodemon/issues/631
    process.stdin.on('data', data => {
      data = data.toString().trim();
      if (data.length === 1 && data.charCodeAt(0) === 113) {
        nodemon
          .once('exit', () => {
            process.exit();
          })
          .emit('quit');
      }
    });
  } catch (error) {
    console.log(colors.red(error));
    process.exit(1);
  }
};

if (isDevApp) {
  runDevApp();
} else if (isDevApi) {
  runDevApi();
}
