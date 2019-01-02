// load environment variables at first place
require('./env');

// expose api server with esm loader
require('./esm')('./bin/apiServer');
