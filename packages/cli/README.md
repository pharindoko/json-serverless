json-serverless
===============

cli for json-serverless project

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/json-serverless.svg)](https://npmjs.org/package/json-serverless)
[![Downloads/week](https://img.shields.io/npm/dw/json-serverless.svg)](https://npmjs.org/package/json-serverless)
[![License](https://img.shields.io/npm/l/json-serverless.svg)](https://github.com/pharindoko/json-serverless/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g json-serverless
$ jsonsls COMMAND
running command...
$ jsonsls (-v|--version|version)
json-serverless/0.0.0 darwin-x64 node-v11.5.0
$ jsonsls --help [COMMAND]
USAGE
  $ jsonsls COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`jsonsls create [FILE]`](#jsonsls-create-file)
* [`jsonsls hello [FILE]`](#jsonsls-hello-file)
* [`jsonsls help [COMMAND]`](#jsonsls-help-command)
* [`jsonsls run [FILE]`](#jsonsls-run-file)

## `jsonsls create [FILE]`

describe the command here

```
USAGE
  $ jsonsls create [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/create.ts](https://github.com/pharindoko/json-serverless/blob/v0.0.0/src/commands/create.ts)_

## `jsonsls hello [FILE]`

describe the command here

```
USAGE
  $ jsonsls hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ jsonsls hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/pharindoko/json-serverless/blob/v0.0.0/src/commands/hello.ts)_

## `jsonsls help [COMMAND]`

display help for jsonsls

```
USAGE
  $ jsonsls help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.1/src/commands/help.ts)_

## `jsonsls run [FILE]`

describe the command here

```
USAGE
  $ jsonsls run [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/run.ts](https://github.com/pharindoko/json-serverless/blob/v0.0.0/src/commands/run.ts)_
<!-- commandsstop -->
