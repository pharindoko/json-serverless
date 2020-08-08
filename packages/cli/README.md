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
json-serverless/1.5.51 linux-x64 node-v10.22.0
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
* [`jsonsls validate FILE`](#jsonsls-validate-file)

## `jsonsls create-stack FILE [STAGE]`

create the stackfolder and deploy the stack in the cloud

```
USAGE
  $ jsonsls create-stack FILE [STAGE]

ARGUMENTS
  FILE   path of JSON file
  STAGE  [default: dev] stage name

OPTIONS
  -a, --apikeyauth                 require api key authentication to access api
  -d, --description=description    api description
  -h, --help                       show CLI help
  -i, --region=region              AWS region
  -l, --loglevel=info|debug        [default: info] loglevel of outputs
  -n, --name=name                  api name
  -r, --readonly                   set api to readonly (true) or writeable (false)
  -s, --[no-]swagger               enable or disable swagger interface support
  -y, --autoapprove                skip interactive approval before deployment
  --apiRoute=apiRoute              [default: /api] path to use for api route
  --apispecRoute=apispecRoute      [default: /api-spec] path for the swagger / open api specification
  --graphqlRoute=graphqlRoute      [default: /graphql] path for the graphql interface
  --swaggeruiRoute=swaggeruiRoute  [default: /ui] path for the swagger ui interface
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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `jsonsls run FILE`

run and test the api locally

```
USAGE
  $ jsonsls run FILE

ARGUMENTS
  FILE  path of JSON file

OPTIONS
  -e, --env=development|local      [default: local] environment
  -h, --help                       show CLI help
  -l, --loglevel=info|debug        [default: info] loglevel of outputs
  -r, --readonly                   set api to readonly (true) or writeable (false)
  -s, --[no-]swagger               enable or disable swagger interface support
  --apiRoute=apiRoute              [default: /api] path to use for api route
  --apispecRoute=apispecRoute      [default: /api-spec] path for the swagger / open api specification
  --graphqlRoute=graphqlRoute      [default: /graphql] path for the graphql interface
  --swaggeruiRoute=swaggeruiRoute  [default: /ui] path for the swagger ui interface
```

## `jsonsls update-stack`

update the stackfolder and update the stack in the cloud

```
USAGE
  $ jsonsls update-stack

OPTIONS
  -a, --apikeyauth                         require api key authentication to access api
  -h, --help                               show CLI help
  -l, --loglevel=info|debug                [default: info] loglevel of outputs
  -p, --currentdirectory=currentdirectory  current working directory that will be used for execution
  -r, --readonly                           set api to readonly (true) or writeable (false)
  -s, --[no-]swagger                       enable or disable swagger interface support
  --apiRoute=apiRoute                      [default: /api] path to use for api route
  --apispecRoute=apispecRoute              [default: /api-spec] path for the swagger / open api specification
  --graphqlRoute=graphqlRoute              [default: /graphql] path for the graphql interface
  --swaggeruiRoute=swaggeruiRoute          [default: /ui] path for the swagger ui interface
```

## `jsonsls validate FILE`

describe the command here

```
USAGE
  $ jsonsls validate FILE

ARGUMENTS
  FILE  path of JSON file

OPTIONS
  -h, --help          show CLI help
  -s, --[no-]swagger  enable or disable swagger interface support
```
<!-- commandsstop -->
