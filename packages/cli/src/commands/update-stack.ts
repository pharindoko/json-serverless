import fs from 'fs-extra';
import { Command, flags } from '@oclif/command';
import Listr = require('listr');
import { AppConfig } from 'json-serverless-lib';
import * as path from 'path';
import { Helpers } from '../actions/helpers';
import { AWSActions } from '../actions/aws-actions';
import { ServerlessConfig } from '../classes/serverlessconfig';

export class UpdateStackCommand extends Command {
  static description = 'describe the command here'

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

  async run() {
    const {args, flags} = this.parse(UpdateStackCommand)
    const stackFolder = process.cwd();
    const tasks = new Listr([
      {
        title: 'Validate AWS Identity',
        task: async (task) => {
          const identity = await AWSActions.checkValidAWSIdentity();
          task.output = 'AWS Account: ' + identity.Account;
        },
      },
      {
        title: 'Validate JSON Serverless Directory',
        task: (task) => {
          Helpers.isJSONServerlessDirectory(stackFolder);
        },
      },
      {
        title: 'Create Appconfig',
        task: (ctx, task) => {
          const appconfig = new AppConfig();
          appconfig.enableApiKeyAuth = flags.apikeyauth;
          appconfig.readOnly = flags.readonly;
          appconfig.enableSwagger = flags.swagger;
          fs.writeFileSync(path.normalize(
            stackFolder + '/config/appconfig.json'),
            JSON.stringify(appconfig, null, 2),
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
}
