'use strict';

const fs = require('fs');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { syspath } = require('../config');

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    '`NODE_ENV` environment variable was missing. Please specify it before running.'
  );
}

let envFile = `${syspath.config}/.env`;
// using .env.[NODE_ENV] file instead when not in `production` environment
if (NODE_ENV !== 'production') {
  envFile = `${envFile}.${NODE_ENV}`;
}

// expand existing environment variables with targeted .env file
let parsed;
if (fs.existsSync(envFile)) {
  const result = dotenvExpand(dotenv.config({ path: envFile }));
  parsed = result.parsed;
}

function getCustomEnv() {
  if (!parsed) return {};
  // Populate key/value based on parsed env result for DefinePlugin
  // NOTE: We DON'T use destructuring from `process.env` object
  // this is to avoid expose any sensitive data when come to bundling on client
  // assignment should be based on `process.env.[ENV_NAME]` is used
  const stringified = Object.keys(parsed).reduce((result, key) => {
    result[`process.env.${key}`] = JSON.stringify(parsed[key]);
    return result;
  }, {});

  return { parsed, stringified };
}

// export env related
module.exports = {
  envFile,
  getCustomEnv
};
