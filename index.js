require = require('esm-wallaby')(module /*, options*/);

// load environment variables
require('./env.loader');

// run app server
require('./app/index');
