import * as inquirer from 'inquirer';
import fs from 'fs-extra';
import { Command, flags } from '@oclif/command';
import Listr = require('listr');
import { AppConfig, LogLevel } from 'json-serverless-lib';
import * as path from 'path';
import cli from 'cli-ux';
import { Helpers } from '../actions/helpers';
import { AWSActions } from '../actions/aws-actions';
import { ServerlessConfig } from '../classes/serverlessconfig';
import chalk from 'chalk';
import { v4 as uuidv4 } from 'uuid';
export class CreateStackCommand extends Command {
  static description =
    'create the stackfolder and deploy the stack in the cloud';

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with no value (-f, --force)
    readonly: flags.boolean({
      char: 'r', // shorter flag version
      description: 'set api to readonly (true) or writeable (false)', // help description for flag
      hidden: false, // hide from help
      default: false, // default value if flag not passed (can be a function that returns a string or undefined)
      required: false, // default value if flag not passed (can be a function that returns a string or undefined)
    }),
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
      description: 'require api key authentication to access api', // help description for flag
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
    name: flags.string({
      char: 'n', // shorter flag version
      description: 'api name', // help description for flag
      hidden: false, // hide from help
      default: '', // default value if flag not passed (can be a function that returns a string or undefined)
      required: false, // make flag required (this is not common and you should probably use an argument instead)
    }),
    region: flags.string({
      char: 'i', // shorter flag version
      description: 'AWS region', // help description for flag
      hidden: false, // hide from help
      default: '', // default value if flag not passed (can be a function that returns a string or undefined)
      required: false, // make flag required (this is not common and you should probably use an argument instead)
    }),
    description: flags.string({
      char: 'd', // shorter flag version
      description: 'api description', // help description for flag
      hidden: false, // hide from help
      default: '', // default value if flag not passed (can be a function that returns a string or undefined)
      required: false, // make flag required (this is not common and you should probably use an argument instead)
    }),
    autoapprove: flags.boolean({
      char: 'y', // shorter flag version
      description: 'skip interactive approval before deployment', // help description for flag
      hidden: false, // hide from help
      default: false, // default value if flag not passed (can be a function that returns a string or undefined)
      required: false, // make flag required (this is not common and you should probably use an argument instead)
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
    {
      name: 'stage', // name of arg to show in help and reference with args[name]
      required: false, // make the arg required with `required: true`
      description: 'stage name', // help description
      default: 'dev',
      hidden: false, // hide this arg from help
    },
  ];

  async run() {
    const logo = await Helpers.generateLogo('json-serverless');
    this.log();
    this.log(`${chalk.blueBright(logo)}`);
    this.log();
    const { args, flags } = this.parse(CreateStackCommand);
    await this.checkIdentity();

    let stackName = await this.getApiName(flags.name);
    let stackDescription = await this.getDescription(flags.description);
    let apiKeyValue: string;
    this.log();
    let region: string | undefined;
    if (flags.region) {
      region = flags.region;
    } else {
      region = await this.getRegion();
    }
    let filePath = path.normalize(args.file);
    const templateFolder = path.normalize(
      this.config.root + '/node_modules/json-serverless-template/'
    );
    const stackFolder = path.normalize(process.cwd() + '/' + stackName + '/');
    this.log();
    this.log(
      'New stack template folder will be created under path: ' +
        `${chalk.blueBright.bold.underline(stackFolder)}`
    );
    this.log();

    let confirm = true;
    if (!flags.autoapprove) {
      confirm = await cli.confirm(`${chalk.magenta('Continue ? y/n')}`);
    }

    if (confirm) {
      this.log();
      const tasks = new Listr([
        {
          title: 'Validate Files',
          task: async (task) => {
            filePath = Helpers.validateFile(filePath);
          },
        },
        {
          title: 'Validate StackFolder',
          task: (task) => {
            Helpers.validateStackFolder(stackFolder);
          },
        },
        {
          title: 'Copy Template Files',
          task: async (task) => {
            await fs.copy(templateFolder, stackFolder, {
              dereference: true,
              recursive: true,
              overwrite: true,
            });
          },
        },
        {
          title: 'Create Appconfig',
          task: (ctx, task) => {
            const appconfig = new AppConfig();
            appconfig.jsonFile = filePath;
            appconfig.enableApiKeyAuth = flags.apikeyauth;
            appconfig.readOnly = flags.readonly;
            appconfig.enableSwagger = flags.swagger;
            appconfig.stackName = stackName!;
            appconfig.logLevel = flags.loglevel as LogLevel;
            appconfig.routes.apiRoutePath = flags.apiRoute;
            appconfig.routes.graphqlRoutePath = flags.graphqlRoute;
            appconfig.routes.swaggerSpecRoutePath = flags.apispecRoute;
            appconfig.routes.swaggerUIRoutePath = flags.swaggeruiRoute;

            Helpers.createDir(stackFolder + '/config');
            fs.writeFileSync(
              path.normalize(stackFolder + '/config/appconfig.json'),
              JSON.stringify(appconfig, null, 2),
              'utf-8'
            );
          },
        },
        {
          title: 'Create ServerlessConfig',
          task: (ctx, task) => {
            const serverlessConfig = new ServerlessConfig();
            serverlessConfig.awsRegion = region;
            serverlessConfig.stage = args.stage;
            Helpers.createDir(stackFolder + '/config');
            fs.writeFileSync(
              path.normalize(stackFolder + '/config/serverlessconfig.json'),
              JSON.stringify(serverlessConfig, null, 2),
              'utf-8'
            );
          },
        },
        {
          title: 'Generate Api Key',
          task: async (ctx, task) => {
            if (flags.apikeyauth) {
              const apikey = '/jsonsls/' + stackName + '-' + args.stage;
              apiKeyValue = flags.apikey ? flags.apikey : uuidv4();
              await AWSActions.putSSMParameter(apikey!, apiKeyValue, region!);
            }
          },
        },
        {
          title: 'Install Dependencies',
          task: async (task) => {
            if (process.env.NODE_ENV != 'local') {
              task.output = 'INSTALL DEPENDENCIES';
              Helpers.removeDir(stackFolder + '/node_modules');
              await Helpers.executeChildProcess(
                'npm i',
                {
                  cwd: stackFolder,
                },
                false
              );
            }
          },
        },
        {
          title: 'Update Package.json',
          task: async (task) => {
            task.output = 'UPDATE PACKAGE.JSON';
            Helpers.updatePackageJson(
              stackFolder,
              stackName!,
              stackDescription!
            );
          },
        },
        {
          title: 'Build Code',
          task: async () => {
            await Helpers.executeChildProcess(
              'npm run build',
              {
                cwd: stackFolder,
              },
              false
            );
          },
        },
        {
          title: 'Deploy Stack on AWS',
          task: async () => {
            await Helpers.executeChildProcess(
              'node_modules/serverless/bin/serverless.js deploy',
              {
                cwd: stackFolder,
              },
              false
            );
          },
        },
      ]);
      let slsinfo = '';
      try {
        await tasks.run();
        slsinfo = await Helpers.executeChildProcess2(
          'node_modules/serverless/bin/serverless.js info',
          { cwd: stackFolder }
        );
      } catch (error) {
        this.error(`${chalk.red(error.message)}`);
      }
      try {
        const appConfig = JSON.parse(
          fs.readFileSync(stackFolder + '/config/appconfig.json', 'UTF-8')
        ) as AppConfig;

        Helpers.createCLIOutput(
          slsinfo,
          appConfig,
          args.stage,
          'jsonsls-' + appConfig.stackName + '-' + args.stage,
          apiKeyValue!
        );
      } catch (error) {
        this.log(`${chalk.red(error.message)}`);
        this.log(slsinfo);
      }
    }
  }

  private async checkIdentity() {
    cli.action.start(
      `${chalk.blueBright('Check AWS Identity')}`,
      `${chalk.blueBright('initializing')}`,
      { stdout: true }
    );
    try {
      const identity = await AWSActions.checkValidAWSIdentity();
      this.log(`${chalk.green('AWS Account: ' + identity.Account)}`);
    } catch (error) {
      this.error(`${chalk.red(error.message)}`);
    }
    cli.action.stop();
    this.log();
  }

  private async getDescription(description: string) {
    let stackDescription: string | undefined;
    if (description) {
      stackDescription = description;
    } else {
      const apiDesriptionAnswer = await inquirer.prompt({
        name: 'answer',
        message: `${chalk.magenta(
          'What is this api used for ? (description)'
        )}`,
        type: 'input',
        validate: Helpers.descriptionValidator,
      });
      stackDescription = apiDesriptionAnswer.answer;
    }
    return stackDescription;
  }

  private async getApiName(name?: string) {
    let stackName: string | undefined;
    if (name) {
      stackName = name;
    } else {
      const apiNameAnswer = await inquirer.prompt({
        name: 'answer',
        message: `${chalk.magenta('What is the name of the api ?')}`,
        type: 'input',
        validate: Helpers.s3BucketValidator,
      });
      stackName = apiNameAnswer.answer;
    }
    return stackName;
  }

  private async getRegion() {
    let regions = await AWSActions.getAllRegionsByName();
    regions.unshift({ name: AWSActions.getCurrentRegion() });
    let region = '';

    let responses: any = await inquirer.prompt([
      {
        name: 'region',
        message: 'select a region',
        type: 'list',
        choices: regions,
      },
    ]);
    region = responses.region;

    return region;
  }
}
