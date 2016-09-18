function getShell() {
  const env = process.env;

  if (process.platform === 'darwin') {
    return {
      shell: env.SHELL || '/bin/bash',
      executeFlag: env.SHELL_EXECUTE_FLAG || '-c',
    };
  }

  if (process.platform === 'win32') {
    return {
      shell: env.SHELL || env.COMSPEC || 'cmd.exe',
      executeFlag: env.SHELL_EXECUTE_FLAG || '/c',
    };
  }

  return {
    shell: env.SHELL || '/bin/sh',
    executeFlag: env.SHELL_EXECUTE_FLAG || '-c',
  };
}

module.exports = getShell;
