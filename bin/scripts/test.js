'use strict';

// first and foremost, specify NODE_ENV variable
process.env.NODE_ENV = 'test';

require('make-promises-safe');
// include env script to load targeted environment file
require('./env');

const { getArgv } = require('./utils');
const argv = getArgv();

// remove coverage folder if any
if (argv.indexOf('--coverage') !== -1) {
  const rimraf = require('rimraf');
  const { syspath } = require('../../config');
  rimraf.sync(`${syspath.storage}/coverage`);
}

require('jest').run(argv);
