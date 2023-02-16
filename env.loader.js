import fs from 'fs';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import { paths } from './utils';

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    '`NODE_ENV` environment variable was missing. Please specify it before running.'
  );
}

// using .env.[NODE_ENV] file instead when not in `production` environment
export let envFile = `${paths.config}/.env`;
if (NODE_ENV !== 'production') {
  envFile = `${envFile}.${NODE_ENV}`;
}

// expand existing environment variables with targeted .env file
let parsed;
if (fs.existsSync(envFile)) {
  const result = dotenvExpand.expand(dotenv.config({ path: envFile }));
  parsed = result.parsed;
}

export function getDefinedVars() {
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
