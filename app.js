// make use of promise safe
require('make-promises-safe');

// load environment variables
require('./env.config');

// expose app with esm loader
const esmLoader = require('./esm.config');
esmLoader('./src/server');
