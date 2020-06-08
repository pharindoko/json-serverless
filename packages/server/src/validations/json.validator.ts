import {
  HasIdAttributeRule,
  HasObjectKeyRule,
  IsObjectRule,
  ValidationRule,
  EmptyArrayRule,
} from './validationrule';

import { RuleResultSeverity } from './ruleevent';
import { ValidationResult } from './validationresult';
export class JSONValidator {
  static validate(json: {}, specificationDependent: boolean): ValidationResult {
    const validationResult = new ValidationResult();
    const rules = new Array<ValidationRule>();
    rules.push(new IsObjectRule(json));
    rules.push(new HasObjectKeyRule(json));
    rules.push(new HasIdAttributeRule(json));
    if (specificationDependent) {
      rules.push(new EmptyArrayRule(json));
    }

    for (const rule of rules) {
      const results = rule.executeValidation();
      validationResult.ruleEventList.push(results);
      for (const result of results.events) {
        if (result.result === RuleResultSeverity.ALERT) {
          validationResult.isValid = false;
        }
      }
    }
    return validationResult;
  }
}
