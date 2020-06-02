import fs from 'fs-extra';
import { Command, flags } from '@oclif/command';
import Listr = require('listr');
import * as path from 'path';
import { Helpers } from '../actions/helpers';
import { AWSActions } from '../actions/aws-actions';
import chalk from 'chalk';
import cli from 'cli-ux';
import { AppConfig } from 'json-serverless-lib';

export class UpdateStackCommand extends Command {
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
    currentdirectory: flags.string({
      char: 'p', // shorter flag version
      description: 'current working directory that will be used for execution', // help description for flag
      hidden: false, // hide from help
      default: '', // default value if flag not passed (can be a function that returns a string or undefined)
      required: false, // make flag required (this is not common and you should probably use an argument instead)
    }),
  };

  async run() {
    const logo = await Helpers.generateLogo('json-serverless');
    this.log();
    this.log(`${chalk.blueBright(logo)}`);
    this.log();
    const { flags } = this.parse(UpdateStackCommand);

    if (flags.currentdirectory) {
      Helpers.changeDirectory(flags.currentdirectory);
    }

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

    const templateFolder = path.normalize(
      this.config.root + '/node_modules/json-serverless-template/'
    );
    const stackFolder = process.cwd();
    const tasks = new Listr([
      {
        title: 'Validate JSON Serverless Directory',
        task: (task) => {
          Helpers.isJSONServerlessDirectory(stackFolder);
        },
      },
      {
        title: 'Copy Template Files',
        task: async (task) => {
          if (process.env.NODE_ENV === 'local') {
            await fs.copy(
              templateFolder + '/node_modules',
              stackFolder + '/node_modules'
            );
          }
          await fs.copy(templateFolder + '/src', stackFolder + '/src');
          await fs.copy(
            templateFolder + '/package.json',
            stackFolder + '/package.json'
          );
          await fs.copy(
            templateFolder + '/package-lock.json',
            stackFolder + '/package-lock.json'
          );
          await fs.copy(
            templateFolder + '/serverless.yml',
            stackFolder + '/serverless.yml'
          );
          await fs.copy(
            templateFolder + '/tsconfig.json',
            stackFolder + '/tsconfig.json'
          );
          await fs.copy(
            templateFolder + '/webpack.config.js',
            stackFolder + '/webpack.config.js'
          );
        },
      },
      {
        title: 'Update Appconfig',
        task: (ctx, task) => {
          const appConfig = JSON.parse(
            fs.readFileSync(stackFolder + '/config/appconfig.json', 'UTF-8')
          );
          appConfig.enableApiKeyAuth = flags.apikeyauth;
          appConfig.readOnly = flags.readonly;
          appConfig.enableSwagger = flags.swagger;
          fs.writeFileSync(
            path.normalize(stackFolder + '/config/appconfig.json'),
            JSON.stringify(appConfig, null, 2),
            'utf-8'
          );
        },
      },
      {
        title: 'Update Dependencies',
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
            'node_modules/serverless/bin/serverless deploy',
            {
              cwd: stackFolder,
            },
            false
          );
        },
      },
    ]);
    try {
      await tasks.run();
      const testff = await Helpers.executeChildProcess2(
        'node_modules/serverless/bin/serverless info',
        { cwd: stackFolder }
      );

      const rows = JSON.stringify(testff).split('\\n') as any[];
      const createKeyValues = rows.map((x, i, rows) => {
        if (x.startsWith('  ANY -')) {
          x = {
            name: x.split(' - ')[0],
            value: x.split(' - ')[1],
          };
        } else {
          x = {
            name: x.split(':')[0],
            value: x.split(':')[1],
          };
        }
        return x;
      });

      const outputJson = createKeyValues
        .map((x, i, rows) => {
          if (rows[i + 1] && rows[i + 1].name.startsWith('  ')) {
            x.value = rows[i + 1].value;
          }
          if (x && x.name.startsWith('  ')) {
            return null;
          }
          if (x.name) {
            x.name = x.name.replace(/\s/g, '');
          }
          if (x.value) {
            x.value = x.value.replace(/\s/g, '');
          }

          return x;
        })
        .filter(
          (item) =>
            item != null &&
            item.hasOwnProperty('value') &&
            item.value != undefined
        )
        .reduce(
          (obj, item) => Object.assign(obj, { [item.name]: item.value }),
          {}
        );
      this.log();
      this.log(
        'The Api ' + outputJson.service + ' has been successfully deployed'
      );
      this.log();
      this.log('Further details:');
      cli.table(
        [
          {
            text: `${chalk.blueBright('Stage')}`,
            link: outputJson.stage,
          },
          {
            text: `${chalk.blueBright('Region')}`,
            link: outputJson.region,
          },
          {
            text: `${chalk.blueBright('Cloudformation Stack')}`,
            link: outputJson.stack,
          },
        ],
        { text: { minWidth: 30 }, link: { minWidth: 20 } },
        { 'no-header': true }
      );

      this.log();
      this.log();
      const appConfig = JSON.parse(
        fs.readFileSync(stackFolder + '/config/appconfig.json', 'UTF-8')
      ) as AppConfig;
      if (appConfig.enableApiKeyAuth) {
        this.log(
          `${chalk.green(
            'Please use the following apiKey (x-api-key) to authenticate:'
          )} ` + outputJson.apikeys
        );
      }
      this.log();
      this.log();

      cli.table(
        [
          {
            text: `${chalk.blueBright('Swagger UI')}`,
            link: outputJson.endpoints + '/ui',
          },
          {
            text: `${chalk.blueBright('GraphiQL')}`,
            link: outputJson.endpoints + '/graphql',
          },
          {
            text: `${chalk.blueBright('Swagger Specification')}`,
            link: outputJson.endpoints + '/api-spec',
          },
          {
            text: `${chalk.blueBright('API Routes')}`,
            link: outputJson.endpoints + '/api/{routes}',
          },
        ],
        { text: { minWidth: 30 }, link: { minWidth: 20 } },
        { 'no-header': true }
      );
      this.log();
      this.log();
    } catch (error) {
      this.error(`${chalk.red(error.message)}`);
    }
  }
}
