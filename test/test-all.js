const assert = require('assert');
const defaultShell = require('../src/index');

describe('spawn-default-shell', () => {
  it('piping should work', (done) => {
    const child = defaultShell.spawn('cat test/data/test.txt | grep 1', {
      stdio: 'pipe',
    });

    child.stdout.on('data', (data) => {
      assert.strictEqual(data.toString('utf8'), '1 äö☃\n');
    });

    child.on('close', (code) => {
      assert.strictEqual(code, 0);
      done();
    });
  });
});
