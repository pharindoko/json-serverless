import {
  HasIdAttributeRule,
  HasObjectKeyRule,
  IsObjectRule,
  ValidationRule,
} from './validationrule';
import { RuleResultSeverity } from './ruleevent';
import { Output } from '../utils/output';
export class JSONValidator {
  static validate(json: {}): boolean {
    let isValid = true;
    const rules = new Array<ValidationRule>();
    rules.push(new IsObjectRule(json));
    rules.push(new HasObjectKeyRule(json));
    rules.push(new HasIdAttributeRule(json));

    Output.setInfo(
      'ValidationRule:' +
        'Result'.padStart(60 - 'ValidationRule'.length) +
        'Message'.padStart(80)
    );
    for (const rule of rules) {
      const results = rule.executeValidation();
      for (const result of results.events) {
        Output.setInfo(
          results.validationRule +
            ':' +
            result.result
              .toString()
              .padStart(60 - results.validationRule!.length) +
            result.message.padStart(80)
        );
        if (result.result === RuleResultSeverity.ALERT) {
          isValid = false;
        }
      }
    }
    return isValid;
  }
}
