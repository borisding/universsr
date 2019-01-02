// load environment variables at first place
require('./env');

// expose app server with esm loader
require('./esm')('./bin/appServer');
