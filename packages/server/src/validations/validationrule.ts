import { RuleEvent, RuleResultSeverity, RuleEventList } from './ruleevent';
import * as requestSchema from './requestschema.json';
import ajv from 'ajv';
export abstract class ValidationRule {
  protected jsonObject = {} as object;
  ruleEvents = new Array<RuleEvent>();
  constructor(jsonObject: {}) {
    this.jsonObject = jsonObject;
  }
  events = new Array<string>();
  executeValidation(): RuleEventList {
    const ruleEventList = new RuleEventList();
    const result = this.validate();
    ruleEventList.events = ruleEventList.events.concat(result);
    ruleEventList.validationRule = this.constructor.name;
    return ruleEventList;
  }

  protected abstract validate(): RuleEvent[];
}

export class IsObjectRule extends ValidationRule {
  validate(): RuleEvent[] {
    let ruleSeverity = RuleResultSeverity.OK;
    let message = '';
    try {
      if (
        this.jsonObject &&
        typeof this.jsonObject === 'object' &&
        this.jsonObject.constructor !== Object
      ) {
        ruleSeverity = RuleResultSeverity.ALERT;
        message = 'root level of json content must be a json object';
      }
    } catch (e) {
      ruleSeverity = RuleResultSeverity.ALERT;
      message = e.message;
    }
    this.ruleEvents.push(new RuleEvent(ruleSeverity, message));
    return this.ruleEvents;
  }
}

export class HasObjectKeyRule extends ValidationRule {
  validate(): RuleEvent[] {
    let ruleSeverity = RuleResultSeverity.OK;
    let message = '';
    try {
      if (this.jsonObject && typeof this.jsonObject === 'object') {
        if (Object.keys(this.jsonObject).length === 0) {
          ruleSeverity = RuleResultSeverity.ALERT;
          message = 'no root properties found - no endpoints can be created';
        }
      }
    } catch (e) {
      ruleSeverity = RuleResultSeverity.ALERT;
      message = e.message;
    }
    this.ruleEvents.push(new RuleEvent(ruleSeverity, message));
    return this.ruleEvents;
  }
}

export class HasIdAttributeRule extends ValidationRule {
  validate(): RuleEvent[] {
    try {
      if (
        this.jsonObject &&
        typeof this.jsonObject === 'object' &&
        Object.keys(this.jsonObject).length !== 0
      ) {
        Object.keys(this.jsonObject).forEach(item => {
          let ruleSeverity = RuleResultSeverity.OK;
          let message = '';
          if (
            Array.isArray(this.jsonObject[item]) &&
            this.jsonObject[item].length > 0 &&
            !this.jsonObject[item][0].hasOwnProperty('id')
          ) {
            (ruleSeverity = RuleResultSeverity.WARNING),
              (message =
                item +
                ' is missing id attribute - not possible to do POST, PUT, PATCH');
          }
          this.ruleEvents.push(new RuleEvent(ruleSeverity, message));
        });
      }
    } catch (e) {
      const ruleSeverityError = RuleResultSeverity.ALERT;
      const messageError = e.message;
      this.ruleEvents.push(new RuleEvent(ruleSeverityError, messageError));
    }
    return this.ruleEvents;
  }
}
export class EmptyArrayRule extends ValidationRule {
  validate(): RuleEvent[] {
    try {
      if (this.jsonObject) {
        const ajvObject = new ajv();
        const result = ajvObject.validate(requestSchema, this.jsonObject);
        if (!result) {
          for (const error of ajvObject.errors) {
            if (error.message.includes('should NOT have fewer than 1 items')) {
              const ruleSeverityError = RuleResultSeverity.ALERT;
              const messageError =
                'empty array found at path: ' +
                error.instancePath +
                ' - please deactivate Swagger/GraphQL interface (--no-swagger) or add at least one item in the array';
              this.ruleEvents.push(
                new RuleEvent(ruleSeverityError, messageError)
              );
            }
          }
        }
      }
    } catch (e) {
      const ruleSeverityError = RuleResultSeverity.ALERT;
      const messageError = e.message;
      this.ruleEvents.push(new RuleEvent(ruleSeverityError, messageError));
    }
    return this.ruleEvents;
  }
}
