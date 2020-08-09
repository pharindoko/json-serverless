import fs from 'fs';
import {
  HasIdAttributeRule,
  HasObjectKeyRule,
  IsObjectRule,
} from '../src/validations/validationrule';
import { JSONValidator } from '../src/validations/json.validator';
import { RuleResultSeverity } from '../src/validations/ruleevent';

let validateJSON = '';
beforeAll(() => {
  validateJSON = JSON.parse(
    fs.readFileSync('./tests/resources/validate.handler.json', 'utf-8')
  );
});
test('It should have an id attribute', () => {
  const rule = new HasIdAttributeRule(validateJSON);
  expect(rule.validate()[0].result).toBe(RuleResultSeverity.OK);
});

test('It should have no id attribute', () => {
  const rule = new HasIdAttributeRule(validateJSON);
  expect(rule.validate()[1].result).toBe(RuleResultSeverity.WARNING);
});

test('It should have object keys', () => {
  const rule = new HasObjectKeyRule(validateJSON);
  expect(rule.validate()[0].result).toBe(RuleResultSeverity.OK);
});

test('It should have no object keys', () => {
  const rule = new HasObjectKeyRule(JSON.parse('{}'));
  expect(rule.validate()[0].result).toBe(RuleResultSeverity.ALERT);
});

test('It should be an Object', () => {
  const rule = new IsObjectRule(validateJSON);
  expect(rule.validate()[0].result).toBe(RuleResultSeverity.OK);
});

test('It should be no Object', () => {
  const rule = new IsObjectRule(JSON.parse('[]'));
  expect(rule.validate()[0].result).toBe(RuleResultSeverity.ALERT);
});

test('It should return valid rules', () => {
  const validator = JSONValidator.validate(validateJSON, true);
  expect(validator.isValid).toBeTruthy();
});

test('It should return valid rules', () => {
  const validator = JSONValidator.validate(JSON.parse('[]'), true);
  expect(validator.isValid).toBeFalsy();
});

test('It should return valid rules', () => {
  const validator = JSONValidator.validate(JSON.parse('{}'), true);
  expect(validator.isValid).toBeFalsy();
});
