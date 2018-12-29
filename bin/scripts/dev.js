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
const { spawn, isApi, isApp, checkAppOrApiArgumentsOnly } = require('./utils');
const { SYSPATH } = require('../../config');

checkAppOrApiArgumentsOnly();

// running app server
const runDevApp = () => {
  spawn(`${SYSPATH['ROOT']}/app.js`);
};

// running api server
const runDevApi = () => {
  try {
    nodemon({
      script: `${SYSPATH['ROOT']}/api.js`,
      watch: [`${SYSPATH['ROOT']}/src/api/*`],
      ignore: [`${SYSPATH['ROOT']}/storage/sessions/*`],
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

if (isApp) {
  runDevApp();
} else if (isApi) {
  runDevApi();
}
