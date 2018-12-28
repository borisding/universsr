// first and foremost, specify NODE_ENV variable
process.env.NODE_ENV = 'production';
// include env script to load targeted environment file
require('./env');

const fs = require('fs');
const colors = require('colors');
const slash = require('slash');
const { spawn } = require('child_process');
const { SYSPATH } = require('../../config');
const webpackConfig = require('../webpack/config');

const argv = process.argv.slice(2)[0];
const argvs = ['--app', '--api'];

if (!argvs.includes(argv)) {
  console.log(colors.red(`Expected argument: ==> ${argvs}`));
  process.exit(1);
}

// simply check both client and server build output dir/file does exist
// before running app server for production environment
if (argv === argvs[0]) {
  const checkIfOutputExist = output => {
    if (!fs.existsSync(output)) {
      console.log(
        colors.red(`Action aborted. (${slash(output)}) does not exist.`)
      );
      console.log(
        colors.yellow(
          'Please run `npm run build` script before starting server.'
        )
      );
      process.exit(1);
    }
  };

  const clientConfig = webpackConfig[0];
  const serverConfig = webpackConfig[1];
  [
    clientConfig.output.path,
    `${serverConfig.output.path}/${serverConfig.output.filename}`
  ].forEach(output => checkIfOutputExist(output));
}

const runServer = file => {
  spawn('node', [`${SYSPATH['ROOT']}/${file}`], {
    stdio: 'inherit'
  });
};

if (argv === argvs[0]) {
  runServer('app.js');
} else if (argv === argvs[1]) {
  runServer('api.js');
}
