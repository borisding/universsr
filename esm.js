// ES module loader for non-transpiled modules, for more options
// @see: https://github.com/standard-things/esm#options
require = require('esm')(module);

// to enable aliases imports for non-transpiled modules
require('module-alias/register');

module.exports = file => require(file).default;
