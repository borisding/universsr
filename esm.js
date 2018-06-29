require = require('esm')(module);
require('module-alias/register');

module.exports = file => require(file).default;
