const esmImport = require('./esm.import');

esmImport('./env.loader');

// run api entry
esmImport('./api/index');
