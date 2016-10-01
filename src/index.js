const childProcess = require('child_process');
const getShell = require('./get-shell');

function spawn(command, spawnOpts) {
  const shellDetails = getShell();

  const args = shellDetails.executeFlags.split(' ');
  return childProcess.spawn(
    shellDetails.shell,
    args.concat([command]),
    spawnOpts
  );
}

module.exports = {
  spawn: spawn,
};
