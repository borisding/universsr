const fs = require('fs');
const dotenv = require('dotenv');
const SYSPATH = require('./config/syspath');

let pathToEnv = `${SYSPATH['CONFIG']}/.env`;

// using .env.example file instead if .env does not exist
if (!fs.existsSync(pathToEnv)) {
  pathToEnv = pathToEnv + '.example';
}

// load environment variable config `.env`
dotenv.config({ path: pathToEnv });

// expose api server with esm loader
require('./esm')('./bin/apiServer');
