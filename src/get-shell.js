const DETECT_CMD_REGEX = /cmd.exe/;
// All sh variant names I found end with "sh":
// https://en.wikipedia.org/wiki/List_of_command-line_interpreters
const DETECT_SH_REGEX = /sh$/;

function detectPlatformShell() {
  if (process.platform === 'darwin') {
    return process.env.SHELL || '/bin/bash';
  }

  if (process.platform === 'win32') {
    return process.env.SHELL || process.env.COMSPEC || 'cmd.exe';
  }

  return process.env.SHELL || '/bin/sh';
}

function detectExecuteFlags(shell) {
  if (process.env.SHELL_EXECUTE_FLAGS) {
    return process.env.SHELL_EXECUTE_FLAGS;
  }

  if (shell.match(DETECT_CMD_REGEX)) {
    return '/c';
  } else if (shell.match(DETECT_SH_REGEX)) {
    return '-l -c';
  }

  throw new Error('Unable to detect platform shell type. Please set SHELL_EXECUTE_FLAGS env variable.');
}

function getShell() {
  const shell = detectPlatformShell();

  return {
    shell: shell,
    executeFlags: detectExecuteFlags(shell),
  };
}

module.exports = getShell;
