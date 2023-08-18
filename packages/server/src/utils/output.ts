import { Logger } from './logger';
import { ValidationResult } from '../validations/validationresult';
import { table } from 'table';
export class Output {
  static setWarning(message: string) {
    Logger.getInstance().warn(message);
  }
  static setError(message: string) {
    Logger.getInstance().error(message);
  }
  static setInfo(message: string) {
    Logger.getInstance().info(message);
  }
  static setDebugInfo(message: string) {
    Logger.getInstance().debug(message);
  }

  static printValidationReport(validationResult: ValidationResult) {
    const flattenedRules = new Array<any>();
    flattenedRules.push(['ValidationRule', 'Result', 'Message']);
    for (const ruleEvent of validationResult.ruleEventList) {
      for (const event of ruleEvent.events) {
        flattenedRules.push([
          ruleEvent.validationRule,
          event.result,
          event.message,
        ]);
      }
    }
    const output = table(flattenedRules, {
      columns: {
        2: {
          width: 100,
          wrapWord: true,
        },
      },
      drawHorizontalLine: (index, size) => {
        return index === 0 || index === 1 || index === size;
      },
    });
    console.log(output);
  }
}
