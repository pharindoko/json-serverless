import * as inquirer from 'inquirer';
import fs from 'fs-extra';
import { Command, flags } from '@oclif/command';
import Listr = require('listr');
import { AppConfig } from 'json-serverless-lib';
import * as path from 'path';
import cli from 'cli-ux';
import { Helpers } from '../actions/helpers';
import { AWSActions } from '../actions/aws-actions';
import { ServerlessConfig } from '../classes/serverlessconfig';

export class CreateStackCommand extends Command {
  static description = 'describe the command here';

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
      description: 'activate swagger ui support', // help description for flag
      hidden: false, // hide from help
      default: true, // default value if flag not passed (can be a function that returns a string or undefined)
      required: false, // make flag required (this is not common and you should probably use an argument instead)
    }),
    apikeyauth: flags.boolean({
      char: 'a', // shorter flag version
      description: 'require api key authentication to access api', // help description for flag
      hidden: false, // hide from help
      default: false, // default value if flag not passed (can be a function that returns a string or undefined)
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
    const { args, flags } = this.parse(CreateStackCommand);
    const stackName = await cli.prompt('What is the name of the api ?');
    const region = await this.getRegion();
    let filePath = path.normalize(args.file);
    const templateFolder = path.normalize(this.config.root + '/template');
    const stackFolder= path.normalize(process.cwd() + '/' + stackName);

    console.log('New stack will be created under folder: ' + stackFolder)
    await cli.confirm('Continue ? y/n')
    const tasks = new Listr([
      {
        title: 'Validate AWS Identity',
        task: async (task) => {
          const identity = await AWSActions.checkValidAWSIdentity();
          task.output = 'AWS Account: ' + identity.Account;
        },
      },
      {
        title: 'Validate Files',
        task: (task) => {
          filePath = Helpers.validateFile(filePath);
          task.output = 'JSONFile found under path: ' + filePath;
        },
      },
      {
        title: 'Validate StackFolder',
        task: (task) => {
          Helpers.validateStackFolder(stackFolder);
          task.output = 'Validate that the stackfolder doesn`t exist: ' + stackFolder;
        },
      },
      {
        title: 'Copy Template Files',
        task: async (task) => {
          await fs.copy(templateFolder, stackFolder);
          task.output =
            'Copied files to new stack folder: ' + stackFolder
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
          appconfig.stackName = stackName;
          fs.writeFileSync(path.normalize(
            stackFolder + '/config/appconfig.json'),
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
          serverlessConfig.stage = args.stage
          fs.writeFileSync(path.normalize(
            stackFolder + '/config/serverlessconfig.json'),
            JSON.stringify(serverlessConfig, null, 2),
            'utf-8'
          );
        },
      },
      {
        title: 'Install Dependencies',
        task: async () => {
          await Helpers.executeChildProcess(
            'npm i',
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
            'sls deploy',
            {
              cwd: stackFolder,
            },
            false
          );
        },
      }
    ]);
    try {
      await tasks.run();
      await Helpers.executeChildProcess('sls info', { cwd: stackFolder});
    } catch (error) {
      console.error(error);
    }
  }

  private async getRegion() {
    let regions = await AWSActions.getAllRegionsByName();
    regions.unshift({ name: AWSActions.getCurrentRegion() });
    let region = '';

    if (!region) {
      let responses: any = await inquirer.prompt([
        {
          name: 'region',
          message: 'select a region',
          type: 'list',
          choices: regions,
        },
      ]);
      region = responses.region;
    }
    return region;
  }
}
