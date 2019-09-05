"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ruleevent_1 = require("./ruleevent");
class ValidationRule {
    constructor(jsonObject) {
        this.jsonObject = {};
        this.ruleEvents = new Array();
        this.events = new Array();
        this.jsonObject = jsonObject;
    }
    executeValidation() {
        const ruleEventList = new ruleevent_1.RuleEventList();
        const result = this.validate();
        ruleEventList.events = ruleEventList.events.concat(result);
        ruleEventList.validationRule = this.constructor.name;
        return ruleEventList;
    }
}
exports.ValidationRule = ValidationRule;
class IsObjectRule extends ValidationRule {
    validate() {
        let ruleSeverity = ruleevent_1.RuleResultSeverity.OK;
        let message = '';
        try {
            if (this.jsonObject &&
                typeof this.jsonObject === 'object' &&
                this.jsonObject.constructor !== Object) {
                ruleSeverity = ruleevent_1.RuleResultSeverity.ALERT;
                message = 'root level of json content must be a json object';
            }
        }
        catch (e) {
            ruleSeverity = ruleevent_1.RuleResultSeverity.ALERT;
            message = e.message;
        }
        this.ruleEvents.push(new ruleevent_1.RuleEvent(ruleSeverity, message));
        return this.ruleEvents;
    }
}
exports.IsObjectRule = IsObjectRule;
class HasObjectKeyRule extends ValidationRule {
    validate() {
        let ruleSeverity = ruleevent_1.RuleResultSeverity.OK;
        let message = '';
        try {
            if (this.jsonObject && typeof this.jsonObject === 'object') {
                if (Object.keys(this.jsonObject).length === 0) {
                    ruleSeverity = ruleevent_1.RuleResultSeverity.ALERT;
                    message = 'no root properties found - no endpoints can be created';
                }
            }
        }
        catch (e) {
            ruleSeverity = ruleevent_1.RuleResultSeverity.ALERT;
            message = e.message;
        }
        this.ruleEvents.push(new ruleevent_1.RuleEvent(ruleSeverity, message));
        return this.ruleEvents;
    }
}
exports.HasObjectKeyRule = HasObjectKeyRule;
class HasIdAttributeRule extends ValidationRule {
    validate() {
        try {
            if (this.jsonObject &&
                typeof this.jsonObject === 'object' &&
                Object.keys(this.jsonObject).length !== 0) {
                Object.keys(this.jsonObject).forEach(item => {
                    let ruleSeverity = ruleevent_1.RuleResultSeverity.OK;
                    let message = '';
                    if (Array.isArray(this.jsonObject[item]) &&
                        this.jsonObject[item].length > 0 &&
                        !this.jsonObject[item][0].hasOwnProperty('id')) {
                        (ruleSeverity = ruleevent_1.RuleResultSeverity.WARNING),
                            (message =
                                item +
                                    ' is missing id attribute - not possible to do POST, PUT, PATCH');
                    }
                    this.ruleEvents.push(new ruleevent_1.RuleEvent(ruleSeverity, message));
                });
            }
        }
        catch (e) {
            const ruleSeverityError = ruleevent_1.RuleResultSeverity.ALERT;
            const messageError = e.message;
            this.ruleEvents.push(new ruleevent_1.RuleEvent(ruleSeverityError, messageError));
        }
        return this.ruleEvents;
    }
}
exports.HasIdAttributeRule = HasIdAttributeRule;
//# sourceMappingURL=validationrule.js.map