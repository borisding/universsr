'use strict';

const rimraf = require('rimraf');
const { syspath } = require('../../config');

// specify target files to be cleaned in a list
const files = ['public', 'src/app/serverRenderer.*'];
files.forEach(target => {
  const absolutePath = `${syspath.root}/${target}`;
  return rimraf.sync(absolutePath);
});
