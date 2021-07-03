require('@babel/register')();

// load environment variables
require('./env.loader');

// run app server
require('./app/server');
