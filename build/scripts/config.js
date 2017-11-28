const fs = require('fs');
const slash = require('slash');
const syspath = require('../../config/syspath');
const nodeConfig = require('../../config/index');
const { error, info } = require('../../src/utils');

// writing validated node config into targeted config filename
// which can be imported directly for client side usage later
function writeConfig() {
  const configFilename = 'index.json';

  try {
    const validatedNodeConfig = JSON.stringify(
      nodeConfig.getProperties(),
      null,
      2
    );

    fs.writeFileSync(
      `${syspath.config}/${configFilename}`,
      validatedNodeConfig,
      'utf8'
    );

    info('Config file [%s] was written in location [%s]!', 0, [
      configFilename,
      slash(syspath.config)
    ]);
  } catch (err) {
    error('Failed to write config file [%s]', -1, [configFilename]);
    error(err);
  }
}

writeConfig();
