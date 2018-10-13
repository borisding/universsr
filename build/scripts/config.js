import fs from 'fs';
import slash from 'slash';
import dotenv from 'dotenv';
import dotenvParseVariables from 'dotenv-parse-variables';
import SYSPATH from '../../config/syspath';

let pathToEnv = `${SYSPATH['CONFIG']}/.env`;

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
      `${SYSPATH['CONFIG']}/${targetConfigFile}`,
      envProperties,
      'utf8'
    );

    console.info(
      'Config file [%s] is generated in location [%s]!',
      targetConfigFile,
      slash(SYSPATH['CONFIG'])
    );
  } catch (err) {
    console.error('Failed to write config file [%s]', targetConfigFile);
    console.error(err);
    process.exit(-1);
  }
};

writeEnvProperties();
