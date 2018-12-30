'use strict';

// first and foremost, specify NODE_ENV variable
process.env.NODE_ENV = 'test';

require('make-promises-safe');
// include env script to load targeted environment file
require('./env');

const { getScriptArguments } = require('./utils');
const argv = getScriptArguments();

// remove coverage folder if any
if (argv.indexOf('--coverage') !== -1) {
  const rimraf = require('rimraf');
  const { SYSPATH } = require('../../config');
  rimraf.sync(`${SYSPATH['STORAGE']}/coverage`);
}

require('jest').run(argv);
