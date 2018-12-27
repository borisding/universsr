// first and foremost, specify NODE_ENV variable
process.env.NODE_ENV = 'development';

// clean files before proceeding
require('./clean');
// include env script to load targeted environment file
require('./env');

const { spawn } = require('child_process');
const { SYSPATH } = require('../../config');
const nodemon = require('nodemon');

const argv = process.argv.slice(2)[0];
const argvs = ['--app', '--api'];

if (!argvs.includes(argv)) {
  throw new Error(`Expected argument: ==> ${argvs}`);
}

// running app server
function runApp() {
  try {
    spawn('node', [`${SYSPATH['ROOT']}/app.js`], { stdio: 'inherit' });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// running api server
function runApi() {
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
      console.log('API server restarted due to: ', files);
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

if (argv === '--app') {
  runApp();
} else if (argv === '--api') {
  runApi();
}
