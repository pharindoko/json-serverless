import {Command, flags} from '@oclif/command'
import {startServer} from '../../../server/lib/packages/server/src/server'
import { AppConfig } from '../../../server/lib/packages/server/src/app';
import express from 'express';


export class Run extends Command {
  static description = 'describe the command here'

  static flags = {
    help: flags.help({char: 'h'}),
    // flag with no value (-e, --env)
    env: flags.string({
    char: 'e',
    description: 'environment', // help description for flag
    hidden: false,                // hide from help
    options: ['development', 'local'],
    default: 'local',
    required: false,
  })
  }

  static args = [
    {
      name: 'file',               // name of arg to show in help and reference with args[name]
      required: true,            // make the arg required with `required: true`
      description: 'path of JSON file', // help description
      hidden: false,               // hide this arg from help
    }
  ]

  async run() {
    const {args, flags} = this.parse(Run)
    const server = express();
    const defaultConfig = new AppConfig();
    defaultConfig.jsonFile = args.file;
    if (args.file && flags.env) {
      startServer(flags.env, server, defaultConfig);
    }
  }
}
