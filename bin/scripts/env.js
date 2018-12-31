'use strict';

const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { SYSPATH } = require('../../config');

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    '`NODE_ENV` environment variable was missing. Please specify it before running.'
  );
}

let pathToEnv = `${SYSPATH['CONFIG']}/.env`;
// using .env.[NODE_ENV] file instead when not in `production` environment
if (NODE_ENV !== 'production') {
  pathToEnv = `${pathToEnv}.${NODE_ENV}`;
}

// expand existing environment variables with targeted .env file
const result = dotenvExpand(dotenv.config({ path: pathToEnv }));
const parsed = result.parsed;

function getCustomEnv() {
  if (!parsed) return {};
  // Populate key/value based on parsed env result for DefinePlugin
  // NOTE: We DON'T use destructuring from `process.env` object
  // this is to avoid expose any sensitive data when come to bundling
  // assignment should be based on `process.env.[ENV_NAME]` is used
  const stringified = Object.keys(parsed).reduce((result, key) => {
    result[`process.env.${key}`] = JSON.stringify(parsed[key]);
    return result;
  }, {});

  return { parsed, stringified };
}

// export env related
module.exports = {
  pathToEnv,
  getCustomEnv
};
