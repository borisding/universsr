const esmImport = require('./esm.import');

// register custom module paths
esmImport('module-alias/register');

// load environment variables
esmImport('./env.loader');

// run api entry
esmImport('./api/index');
