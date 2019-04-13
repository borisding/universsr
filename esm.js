// ES module loader for non-transpiled modules, for more options
// @see: https://github.com/standard-things/esm#options
require = require('esm')(module);

// to enable aliases for required modules
// such as app/api entry index files
require('module-alias/register');

module.exports = file => require(file);
