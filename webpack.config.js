// enable aliases for required modules
// webpack's resolve.alias is sharing the same aliases config in `package.json` file
require('module-alias/register');

// load environment variables for webpack build process
// based on the defined process.env.NODE_ENV value
const env = require('./env.config');

// retrieve client & server config, respectively
// also, passing env variable to client/server config for usage
const webpackClient = require('./webpack/client')(env);
const webpackServer = require('./webpack/server')(env);

module.exports = [webpackClient, webpackServer];
