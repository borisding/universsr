// es module standard, which enables `import` for node
require = require('@std/esm')(module);

// enable module aliases for API `import` modules
require('module-alias/register');

// entry for API
module.exports = require('./src/api').default;
