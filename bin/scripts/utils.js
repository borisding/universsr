'use strict';

const colors = require('colors');
const crossSpawn = require('cross-spawn');

// node spawn process by using crossSpawan package
function spawn(args) {
  if (!Array.isArray(args)) {
    args = [args];
  }

  const child = crossSpawn.sync('node', args, {
    stdio: 'inherit'
  });

  const signals = ['SIGKILL', 'SIGTERM'];
  if (child.signal && signals.includes(child.signal)) {
    // in case process exited too early
    console.log('Process exited too early.');
    process.exit(1);
  }
}

// deal with arguments passed to script
const argv = process.argv.slice(2)[0];
const argvs = ['--app', '--api'];

function checkAppOrApiArgumentsOnly() {
  if (!argvs.includes(argv)) {
    console.log(colors.red(`Expected argument: ==> ${argvs}`));
    process.exit(1);
  }
}

const isApp = argv === argvs[0];
const isApi = argv === argvs[1];

module.exports = {
  spawn,
  isApp,
  isApi,
  checkAppOrApiArgumentsOnly
};
