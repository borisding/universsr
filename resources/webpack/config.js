// enable aliases for required modules
// this will also allow webpack's resolve.alias mapping with absolute paths
require('module-alias/register');

// load environment variables for webpack build process
// based on the defined process.env.NODE_ENV value
require('@root/env');

const webpackClient = require('./client');
const webpackServer = require('./server');

module.exports = [webpackClient, webpackServer];
