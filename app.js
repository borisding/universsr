const esmImport = require('./esm.import');

// load environment variables
esmImport('./env.loader');

// run app entry
esmImport('./app/index');
