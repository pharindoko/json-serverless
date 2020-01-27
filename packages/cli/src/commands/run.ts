import { Command, flags } from '@oclif/command';
import { startServer, AppConfig } from 'json-serverless-lib';
import express from 'express';
import { Helpers } from '../actions/helpers';

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
    await Helpers.generateLogo('json-serverless');
    this.log();
    const { args, flags } = this.parse(Run);
    const server = express();
    const defaultConfig = new AppConfig();
    defaultConfig.readOnly = flags.readonly;
    defaultConfig.jsonFile = args.file;
    if (args.file && flags.env) {
      startServer(
        flags.env,
        server,
        defaultConfig,
        this.config.root + '/package.json'
      );
    }
  }
}
