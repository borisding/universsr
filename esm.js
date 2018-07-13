require = require('esm')(module);

// to enable aliases imports for non-transpiled code
require('module-alias/register');

module.exports = file => require(file).default;
