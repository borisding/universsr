// enable module aliases for config `require`
require('module-alias/register');

const fs = require('fs');
const slash = require('slash');
const dotenv = require('dotenv');
const getenv = require('getenv');
const syspath = require('@config/syspath');

// load environment variable config `.env`;
dotenv.config({ path: `${syspath.config}/.env` });

// read environment variables, default values will be read if not exist
// format: ['defined value', 'default value', 'value type']
const variables = getenv.multi({
  protocol: ['PROTOCOL', 'http', 'string'],
  host: ['HOST', 'localhost', 'string'],
  port: ['PORT', 5000, 'int'],

  apiProtocol: ['API_PROTOCOL', 'http', 'string'],
  apiHost: ['API_HOST', 'localhost', 'string'],
  apiPort: ['API_PORT', 5050, 'int'],
  apiVersion: ['API_VERSION', 'v1', 'string'],

  requestBaseURL: ['REQUEST_BASEURL', '', 'string'],
  requestTimeout: ['REQUEST_TIMEOUT', 5000, 'int'],
  minDelay: ['MIN_DELAY', 0, 'int'],
  secretKey: ['SECRET_KEY', 'this.is.default.secret.key', 'string']
});

// writing environment variables into targeted config filename
// which will be used as universal configuration properties
function writeConfig() {
  const configFilename = 'properties.json';

  try {
    const properties = JSON.stringify(variables, null, 2);

    fs.writeFileSync(`${syspath.config}/${configFilename}`, properties, 'utf8');

    console.info(
      'Config file [%s] was written in location [%s]!',
      configFilename,
      slash(syspath.config)
    );
  } catch (err) {
    console.error('Failed to write config file [%s]', configFilename);
    console.error(err);
    process.exit(-1);
  }
}

writeConfig();
