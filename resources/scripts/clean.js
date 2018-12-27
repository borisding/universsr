const rimraf = require('rimraf');
const { SYSPATH } = require('../../config');

// specify target files to be cleaned in a list
const files = ['public', 'src/app/serverRenderer.*'];
files.forEach(target => {
  const absolutePath = `${SYSPATH['ROOT']}/${target}`;
  return rimraf.sync(absolutePath);
});
