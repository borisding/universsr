// default config entry file with respective configuration values
// this entry is going to be used in `src` across app and api

const configProperties = require('./config-properties.json');

// assigned with `process.env` or fallback to default port value
// when one of the following is not defined in '.env' file
if (!configProperties.PORT) {
  configProperties.PORT = +process.env.PORT || 3000;
}

if (!configProperties.API_PORT) {
  configProperties.API_PORT = +process.env.API_PORT || 3030;
}

// export built config properties for universal usage
module.exports = configProperties;

// export named `SYSPATH` as part of config
module.exports.SYSPATH = require('./syspath');

// export named `DEV` as part of config
module.exports.DEV = require('isdev');

// export named `NODE` as part of config
module.exports.NODE = require('detect-node');
