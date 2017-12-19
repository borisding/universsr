// enable module aliases for webpack compilers `require`
require('module-alias/register');

const webpackClient = require('./webpack/client');
const webpackServer = require('./webpack/server');

module.exports = [webpackClient, webpackServer];
