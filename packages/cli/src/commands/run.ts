import { Command, flags } from '@oclif/command';
import { startServer, AppConfig } from 'json-serverless-lib';
import express from 'express';
import { Helpers } from '../actions/helpers';
import cli from 'cli-ux';
import chalk from 'chalk';
export class Run extends Command {
  static description = 'describe the command here';

  static flags = {
    help: flags.help({ char: 'h' }),
    // flag with no value (-e, --env)
    env: flags.string({
      char: 'e',
      description: 'environment', // help description for flag
      hidden: false, // hide from help
      options: ['development', 'local'],
      default: 'local',
      required: false,
    }),
    swagger: flags.boolean({
      char: 's', // shorter flag version
      description: 'enable or disable swagger interface support', // help description for flag
      hidden: false, // hide from help
      default: true, // default value if flag not passed (can be a function that returns a string or undefined)
      required: false, // make flag required (this is not common and you should probably use an argument instead)
      allowNo: true,
    }),
    readonly: flags.boolean({
      char: 'r', // shorter flag version
      description: 'set api to readonly (true) or writeable (false)', // help description for flag
      hidden: false, // hide from help
      default: false, // default value if flag not passed (can be a function that returns a string or undefined)
      required: false, // default value if flag not passed (can be a function that returns a string or undefined)
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
    defaultConfig.jsonFile = args.file;
    if (args.file && flags.env) {
      const promise = startServer(
        flags.env,
        server,
        defaultConfig,
        this.config.root + '/package.json'
      );
      await promise;
      this.log();
      this.log();

      if (flags.swagger) {
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
              link: 'http://localhost:3000/api/{routes}',
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
              link: 'http://localhost:3000/api/{routes}',
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
}
