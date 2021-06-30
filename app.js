require('@babel/register')();

// load environment variables
require('./env.loader');

// run app entry
require('./app/index');
