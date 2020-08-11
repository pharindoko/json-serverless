import { Command, flags } from '@oclif/command';
import {
  AppConfig,
  LogLevel,
  PublicStrategy,
  ApiKeyStrategy,
  ServerFactory,
} from 'json-serverless-lib';
import express from 'express';
import { Helpers } from '../actions/helpers';
import cli from 'cli-ux';
import chalk from 'chalk';
import { v4 as uuidv4 } from 'uuid';
export class Run extends Command {
  static description = 'run and test the api locally';

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with no value (-e, --env)

    swagger: flags.boolean({
      char: 's', // shorter flag version
      description: 'enable or disable swagger interface support', // help description for flag
      hidden: false, // hide from help
      default: true, // default value if flag not passed (can be a function that returns a string or undefined)
      required: false, // make flag required (this is not common and you should probably use an argument instead)
      allowNo: true,
    }),
    apikeyauth: flags.boolean({
      char: 'a', // shorter flag version
      description: 'enable api key authentication to access api', // help description for flag
      hidden: false, // hide from help
      default: false, // default value if flag not passed (can be a function that returns a string or undefined)
      required: false, // make flag required (this is not common and you should probably use an argument instead)
    }),
    apikey: flags.string({
      description:
        'set a specific api key - if not set a random key will be generated', // help description for flag
      hidden: false, // hide from help
      required: false, // make flag required (this is not common and you should probably use an argument instead)
      dependsOn: ['apikeyauth'],
    }),

    readonly: flags.boolean({
      char: 'r', // shorter flag version
      description: 'set api to readonly (true) or writeable (false)', // help description for flag
      hidden: false, // hide from help
      default: false, // default value if flag not passed (can be a function that returns a string or undefined)
      required: false, // default value if flag not passed (can be a function that returns a string or undefined)
    }),
    loglevel: flags.string({
      char: 'l', // shorter flag version
      description: 'loglevel of outputs', // help description for flag
      hidden: false, // hide from help
      default: 'info',
      options: ['info', 'debug'], // default value if flag not passed (can be a function that returns a string or undefined)
      required: false, // make flag required (this is not common and you should probably use an argument instead)
    }),
    apiRoute: flags.string({
      description: 'path to use for api route', // help description for flag
      hidden: false, // hide from help
      default: '/api',
      required: false, // make flag required (this is not common and you should probably use an argument instead)
    }),
    graphqlRoute: flags.string({
      description: 'path for the graphql interface', // help description for flag
      hidden: false, // hide from help
      default: '/graphql',
      required: false, // make flag required (this is not common and you should probably use an argument instead)
    }),
    apispecRoute: flags.string({
      description: 'path for the swagger / open api specification', // help description for flag
      hidden: false, // hide from help
      default: '/api-spec',
      required: false, // make flag required (this is not common and you should probably use an argument instead)
    }),
    swaggeruiRoute: flags.string({
      description: 'path for the swagger ui interface', // help description for flag
      hidden: false, // hide from help
      default: '/ui',
      required: false, // make flag required (this is not common and you should probably use an argument instead)
    }),
  };

  static args = [
    {
      name: 'file', // name of arg to show in help and reference with args[name]
      required: true, // make the arg required with `required: true`
      description: 'path of JSON file', // help description
      hidden: false, // hide this arg from help
    },
  ];

  async run() {
    const logo = await Helpers.generateLogo('json-serverless');
    this.log(`${chalk.blueBright(logo)}`);
    this.log();
    const { args, flags } = this.parse(Run);
    const server = express();
    const defaultConfig = new AppConfig();
    defaultConfig.readOnly = flags.readonly;
    defaultConfig.enableSwagger = flags.swagger;
    defaultConfig.logLevel = flags.loglevel as LogLevel;
    defaultConfig.routes.apiRoutePath = flags.apiRoute;
    defaultConfig.routes.graphqlRoutePath = flags.graphqlRoute;
    defaultConfig.routes.swaggerSpecRoutePath = flags.apispecRoute;
    defaultConfig.routes.swaggerUIRoutePath = flags.swaggeruiRoute;

    let authStrategy = new PublicStrategy();
    let apiKey = null;
    if (flags.apikeyauth) {
      defaultConfig.enableApiKeyAuth = flags.apikeyauth;
      apiKey = flags.apikey !== undefined ? flags.apikey : uuidv4();
      authStrategy = new ApiKeyStrategy(server, apiKey);
    }

    defaultConfig.jsonFile = args.file;
    if (args.file) {
      const promise = await ServerFactory.createServer(
        'local',
        server,
        defaultConfig,
        this.config.root + '/package.json',
        authStrategy
      );
      await promise;
      this.createCLIOutput(
        flags.swagger,
        flags.apikeyauth,
        flags.apiRoute,
        apiKey!
      );
    }
  }

  private createCLIOutput(
    swagger: boolean,
    apikeyauth: boolean,
    apiRoute: string,
    apiKey: string
  ) {
    if (apikeyauth) {
      this.log();
      this.log();
      this.log(
        'This api is secured by an apikey - use in header {"authorization": apikey}'
      );
      this.log();
      cli.table(
        [
          {
            text: `${chalk.greenBright('ApiKey')}`,
            link: apiKey,
          },
        ],
        { text: { minWidth: 30 }, link: { minWidth: 20 } },
        { 'no-header': true }
      );
    }
    this.log();
    this.log();

    if (swagger) {
      cli.table(
        [
          {
            text: `${chalk.blueBright('Swagger UI')}`,
            link: 'http://localhost:3000/ui',
          },
          {
            text: `${chalk.blueBright('GraphiQL')}`,
            link: 'http://localhost:3000/graphql',
          },
          {
            text: `${chalk.blueBright('Swagger Specification')}`,
            link: 'http://localhost:3000/api-spec',
          },
          {
            text: `${chalk.blueBright('API Routes')}`,
            link: 'http://localhost:3000' + apiRoute + '/{routes}',
          },
        ],
        { text: { minWidth: 30 }, link: { minWidth: 20 } },
        { 'no-header': true }
      );
    } else {
      cli.table(
        [
          {
            text: `${chalk.blueBright('API Routes')}`,
            link: 'http://localhost:3000' + apiRoute + '/{routes}',
          },
        ],
        { text: { minWidth: 30 }, link: { minWidth: 20 } },
        { 'no-header': true }
      );
    }
    this.log();
    this.log();
  }
}
