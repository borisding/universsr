'use strict';

const colors = require('colors');
const crossSpawn = require('cross-spawn');

// deal with arguments passed to script
const argvs = getArgv();
const expectedArgvs = ['--app', '--api'];

const isApp = argvs[0] === expectedArgvs[0];
const isApi = argvs[0] === expectedArgvs[1];

function getArgv() {
  return process.argv.slice(2) || [];
}

function checkOnlyAppOrApiAllowed() {
  if (!isApi && !isApp) {
    console.log(colors.red(`Expected argument: ==> ${expectedArgvs}`));
    process.exit(1);
  }
}

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

module.exports = {
  spawn,
  isApp,
  isApi,
  checkOnlyAppOrApiAllowed,
  getArgv
};
