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
json-serverless/1.5.37 linux-x64 node-v10.20.1
$ jsonsls --help [COMMAND]
USAGE
  $ jsonsls COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`jsonsls create-stack FILE [STAGE]`](#jsonsls-create-stack-file-stage)
* [`jsonsls help [COMMAND]`](#jsonsls-help-command)
* [`jsonsls run FILE`](#jsonsls-run-file)
* [`jsonsls update-stack`](#jsonsls-update-stack)

## `jsonsls create-stack FILE [STAGE]`

describe the command here

```
USAGE
  $ jsonsls create-stack FILE [STAGE]

ARGUMENTS
  FILE   path of JSON file
  STAGE  [default: dev] stage name

OPTIONS
  -a, --apikeyauth    require api key authentication to access api
  -h, --help          show CLI help
  -r, --readonly      set api to readonly (true) or writeable (false)
  -s, --[no-]swagger  enable or disable swagger interface support
```

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

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
  -r, --readonly               set api to readonly (true) or writeable (false)
  -s, --[no-]swagger           enable or disable swagger interface support
```

## `jsonsls update-stack`

describe the command here

```
USAGE
  $ jsonsls update-stack

OPTIONS
  -a, --apikeyauth                         require api key authentication to access api
  -h, --help                               show CLI help
  -p, --currentdirectory=currentdirectory  current working directory that will be used for execution
  -r, --readonly                           set api to readonly (true) or writeable (false)
  -s, --[no-]swagger                       enable or disable swagger interface support
```
<!-- commandsstop -->
