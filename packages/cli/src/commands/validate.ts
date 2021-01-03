import { Command, flags } from '@oclif/command';
import { JSONValidator, Output } from 'json-serverless-lib';
import { Helpers } from '../actions/helpers';
import chalk from 'chalk';
export class Validate extends Command {
  static description = 'validate the json file against specific rules';

  static flags = {
    help: flags.help({ char: 'h' }),
    swagger: flags.boolean({
      char: 's', // shorter flag version
      description: 'enable or disable swagger interface support', // help description for flag
      hidden: false, // hide from help
      default: true, // default value if flag not passed (can be a function that returns a string or undefined)
      required: false, // make flag required (this is not common and you should probably use an argument instead)
      allowNo: true,
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
    const { args, flags } = this.parse(Validate);
    const filePath = Helpers.validateFile(args.file);
    const jsonFileContent = JSON.parse(Helpers.readFileSync(filePath));
    const validationResult = JSONValidator.validate(
      jsonFileContent,
      flags.swagger
    );
    if (validationResult.isValid) {
      this.log(
        `${chalk.green('Validation was successful - No errors found.')}`
      );
    } else {
      this.log(
        `${chalk.red('Validation was not successful - see details below.')}`
      );
    }
    this.log();
    Output.printValidationReport(validationResult);
  }
}
