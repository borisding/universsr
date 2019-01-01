'use strict';

const crossSpawn = require('cross-spawn');

// retrieve passed argument vectors from process.argv
function getArgv() {
  return process.argv.slice(2) || [];
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

  return child;
}

module.exports = {
  spawn,
  getArgv
};
