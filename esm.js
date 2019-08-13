// ES module loader for non-transpiled modules, for more options
// @see: https://github.com/standard-things/esm#options
require = require('esm')(module);

// to make use of promises safe for app/api
require('make-promises-safe');

// to enable aliases for required modules for app/api
require('module-alias/register');

module.exports = file => require(file);
