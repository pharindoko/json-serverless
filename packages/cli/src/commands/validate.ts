import { Command, flags } from '@oclif/command';
import { startServer, AppConfig, JSONValidator } from 'json-serverless-lib';
import express from 'express';
import { Helpers } from '../actions/helpers';
import cli from 'cli-ux';
import chalk from 'chalk';
export class Validate extends Command {
  static description = 'describe the command here';

  static flags = {
    help: flags.help({ char: 'h' }),
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
    const { args } = this.parse(Validate);
    const filePath = Helpers.validateFile(args.file);
    const jsonFileContent = JSON.parse(Helpers.readFileSync(filePath));
    JSONValidator.validate(jsonFileContent);
  }
}
