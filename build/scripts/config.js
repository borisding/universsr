import fs from 'fs';
import slash from 'slash';
import dotenv from 'dotenv';
import dotenvParseVariables from 'dotenv-parse-variables';
import syspath from '../../config/syspath';

let pathToEnv = `${syspath.config}/.env`;

// using .env.example file instead if .env does not exist
if (!fs.existsSync(pathToEnv)) {
  pathToEnv = pathToEnv + '.example';
}

// load environment variable config `.env`
const env = dotenv.config({ path: pathToEnv });
const parsedEnv = dotenvParseVariables(env.parsed);
const targetConfigFile = 'env-properties.json';

// writing parsed environment variables into targeted config filename
// which will be used as universal configuration properties
const writeEnvProperties = () => {
  try {
    const envProperties = JSON.stringify(parsedEnv, null, 2);

    fs.writeFileSync(
      `${syspath.config}/${targetConfigFile}`,
      envProperties,
      'utf8'
    );

    console.info(
      'Config file [%s] was written in location [%s]!',
      targetConfigFile,
      slash(syspath.config)
    );
  } catch (err) {
    console.error('Failed to write config file [%s]', targetConfigFile);
    console.error(err);
    process.exit(-1);
  }
};

writeEnvProperties();
