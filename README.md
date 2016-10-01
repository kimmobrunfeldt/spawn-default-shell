# spawn-default-shell

> Spawn shell command with platform default shell

[![Build Status](https://travis-ci.org/kimmobrunfeldt/spawn-default-shell.svg?branch=master)](https://travis-ci.org/kimmobrunfeldt/spawn-default-shell) [![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/kimmobrunfeldt/spawn-default-shell?branch=master&svg=true)](https://ci.appveyor.com/project/kimmobrunfeldt/spawn-default-shell) *master branch status*

[![NPM Badge](https://nodei.co/npm/spawn-default-shell.png?downloads=true)](https://www.npmjs.com/package/spawn-default-shell)

Like `child_process.spawn` with `shell: true` option but a bit more
convenient and customizable. You can just pass the command as a string,
and it will be executed in the platform default shell. Used in [concurrently](https://github.com/kimmobrunfeldt/concurrently).

```js
// If we are in Linux / Mac, this will work
const defaultShell = require('spawn-default-shell');
const child = defaultShell.spawn('cat src/index.js | grep function');
```

Platform | Command
---------|----------
Windows  | `cmd.exe /c "..."`. If `COMSPEC` env variable is defined, it is used as shell path.
Mac      | `/bin/bash -l -c "..."`
Linux    | `/bin/sh -l -c "..."`

You can always override the shell path by defining these two environment variables:

* `SHELL=/bin/zsh`
* `SHELL_EXECUTE_FLAGS=-l -c` **Warning: execute flag must be the last flag.**

All `sh` variants will be called with `-l` flag (--login). It invokes the shell
as a non-interactive login shell. In bash it means:

> When bash is invoked as an interactive login shell, or as a non-inter-
> active shell with the --login option, it first reads and executes commands
> from the file /etc/profile, if that file exists. After reading
> that file, it looks for ~/.bash_profile, ~/.bash_login, and ~/.profile,
> in that order, and reads and executes commands from the first one that
> exists and is readable. The --noprofile option may be used when the
> shell is started to inhibit this behavior.
>
> When  a  login  shell  exits, bash reads and executes commands from the
> file ~/.bash_logout, if it exists.

## Install

```bash
npm install spawn-default-shell --save
```

## API

### .spawn(command, [opts])

Spawns a new process of the platform default shell using the given command.

For all options, see [child_process](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
documentation.

## License

MIT
