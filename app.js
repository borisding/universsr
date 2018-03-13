// esm standard, which enables `import` for node
require = require('@std/esm')(module);

// enable module aliases for App `import` modules
require('module-alias/register');

// entry for App
module.exports = require('./src/app/server').default;
