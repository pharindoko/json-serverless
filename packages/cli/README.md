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
json-serverless/0.0.6-alpha.13 darwin-x64 node-v12.12.0
$ jsonsls --help [COMMAND]
USAGE
  $ jsonsls COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`jsonsls deploy FILE`](#jsonsls-deploy-file)
* [`jsonsls help [COMMAND]`](#jsonsls-help-command)
* [`jsonsls run FILE`](#jsonsls-run-file)

## `jsonsls deploy FILE`

describe the command here

```
USAGE
  $ jsonsls deploy FILE

ARGUMENTS
  FILE  path of JSON file

OPTIONS
  -a, --apikeyauth  require api key authentication to access api
  -h, --help        show CLI help
  -n, --name=name   (required) [default: json-serverless] name of the api/stack
  -r, --readonly    set api to readonly (true) or writeable (false)
  -s, --swagger     activate swagger ui support
```

_See code: [lib/commands/deploy.js](https://github.com/pharindoko/json-serverless/blob/v0.0.6-alpha.13/lib/commands/deploy.js)_

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

## `jsonsls run FILE`

describe the command here

```
USAGE
  $ jsonsls run FILE

ARGUMENTS
  FILE  path of JSON file

OPTIONS
  -e, --env=development|local  [default: local] environment
  -h, --help                   show CLI help
```

_See code: [lib/commands/run.js](https://github.com/pharindoko/json-serverless/blob/v0.0.6-alpha.13/lib/commands/run.js)_
<!-- commandsstop -->
