require('module-alias/register');
const dotenv = require('dotenv');
const { DEV, SYSPATH } = require('@config');

let pathToEnv = `${SYSPATH['CONFIG']}/.env`;

// using .env.example file instead when in `production` environment
if (DEV) {
  pathToEnv = pathToEnv + '.example';
}

const env = dotenv.config({ path: pathToEnv });
const envResult = env.parsed;

// override the ports if already assigned before
// to assure it's always with the latest port values
if (process.env.PORT && envResult.PORT) {
  process.env.PORT = envResult.PORT;
}

if (process.env.API_PORT && envResult.API_PORT) {
  process.env.API_PORT = envResult.API_PORT;
}

// also export parsed result only for webpack's DefinePlugin usage
module.exports = envResult;
