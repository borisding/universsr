// ES module loader for non-transpiled modules, for more options
// @see: https://github.com/standard-things/esm#options
require = require('esm')(module);

// to enable aliases for required modules for app/api
require('module-alias/register');

// load environment variables at first place
require('./env.config');

module.exports = file => require(file);
