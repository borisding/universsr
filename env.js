'use strict';

const fs = require('fs');
const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');
const { syspath } = require('./config');

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    '`NODE_ENV` environment variable was missing. Please specify it before running.'
  );
}

// using .env.[NODE_ENV] file instead when not in `production` environment
let envFile = `${syspath.config}/dotenv/.env`;
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
  // return empty object instead when none was parsed
  if (!parsed) {
    return { parsed: {}, stringified: {} };
  }

  // populate key/value based on parsed env result for DefinePlugin
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
