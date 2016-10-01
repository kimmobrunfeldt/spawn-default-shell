const assert = require('assert');
const defaultShell = require('../src/index');
const getShell = require('../src/get-shell');
const withEnv = require('./utils').withEnv;

function sharedTests() {
  it('custom /bin/zsh shell should work', () => {
    withEnv({ SHELL: '/bin/zsh' }, () => {
      assert.strictEqual(getShell().shell, '/bin/zsh');
      assert.strictEqual(getShell().executeFlags, '-l -c');
    });
  });

  it('custom execute flag should override default', () => {
    withEnv({ SHELL_EXECUTE_FLAGS: '--execute' }, () => {
      assert.strictEqual(getShell().executeFlags, '--execute');
    });
  });

  it('customizing whole command should work', () => {
    withEnv({ SHELL: '/bin/verycustomshell', SHELL_EXECUTE_FLAGS: '-x' }, () => {
      assert.strictEqual(getShell().shell, '/bin/verycustomshell');
      assert.strictEqual(getShell().executeFlags, '-x');
    });
  });

  it('unknown shell without execution flag should throw error', () => {
    withEnv({ SHELL: '/bin/false' }, () => {
      assert.throws(
        () => {
          defaultShell.spawn('echo test');
        },
        /Unable to detect platform shell type/
      );
    });
  });
}

module.exports = sharedTests;
