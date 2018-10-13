require('module-alias/register');
const webpackClient = require('./client');
const webpackServer = require('./server');

module.exports = [webpackClient, webpackServer];
