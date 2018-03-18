// enable module aliases for webpack compilers `require`
require('module-alias/register');

const webpackClient = require('./client');
const webpackServer = require('./server');

module.exports = [webpackClient, webpackServer];
