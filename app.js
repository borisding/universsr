const esmLoader = require('./esm.loader');

// register custom module paths
esmLoader('module-alias/register');

// load environment variables
esmLoader('./env.loader');

// load server entry for the app
esmLoader('./src/server');
