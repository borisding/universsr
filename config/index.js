// default config entry file with respective configuration values
// this entry is going to be used in `src` across app and api

const envProperties = require('./env-properties.json');

// assigned with `process.env` or fallback to default port value
// when one of the following is not defined in '.env' file
if (!envProperties.PORT) {
  envProperties.PORT = +process.env.PORT || 3000;
}

if (!envProperties.API_PORT) {
  envProperties.API_PORT = +process.env.API_PORT || 3030;
}

// export built environment properties for universal usage
module.exports = envProperties;

// export named `SYSPATH` as part of config
module.exports.SYSPATH = require('./syspath');

// export named `DEV` as part of config
module.exports.DEV = require('isdev');

// export named `NODE` as part of config
module.exports.NODE = require('detect-node');
