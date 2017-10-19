const isDev = require('isdev');

global._DEV_ = !!isDev;
global._PROD_ = !isDev;

require('./src/server/app');
