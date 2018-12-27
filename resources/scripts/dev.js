// first and foremost, specify NODE_ENV variable
process.env.NODE_ENV = 'development';
// clean files before proceeding
require('./clean');
// include env script to load targeted environment file
require('./env');

const colors = require('colors');
const nodemon = require('nodemon');
const { spawn } = require('child_process');
const { SYSPATH } = require('../../config');

const argv = process.argv.slice(2)[0];
const argvs = ['--app', '--api'];

if (!argvs.includes(argv)) {
  console.log(colors.red(`Expected argument: ==> ${argvs}`));
  process.exit(1);
}

// running app server
const runDevApp = () => {
  spawn('node', [`${SYSPATH['ROOT']}/app.js`], {
    stdio: 'inherit'
  });
};

// running api server
const runDevApi = () => {
  try {
    nodemon({
      script: `${SYSPATH['ROOT']}/api.js`,
      watch: [`${SYSPATH['ROOT']}/src/api/*`],
      ignore: [`${SYSPATH['ROOT']}/storage/sessions/*`],
      ext: 'js',
      debug: true
    });
    // listening to restart event
    nodemon.on('restart', function(files) {
      console.log('API server restarted due to: ', colors.green(files));
    });
  } catch (error) {
    console.log(colors.red(error));
    process.exit(1);
  }
};

if (argv === argvs[0]) {
  runDevApp();
} else if (argv === argvs[1]) {
  runDevApi();
}
