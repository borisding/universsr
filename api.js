// load environment variables at first place
require('./env');

// expose api with esm loader
require('./esm.config')('./api/index');
