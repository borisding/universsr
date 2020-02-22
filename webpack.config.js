// enable aliases for required modules
// webpack's resolve.alias is sharing the same aliases config in `package.json` file
require('module-alias/register');

// retrieve client & server config, respectively
const webpackClient = require('./webpack/client');
const webpackServer = require('./webpack/server');

module.exports = [webpackClient, webpackServer];
