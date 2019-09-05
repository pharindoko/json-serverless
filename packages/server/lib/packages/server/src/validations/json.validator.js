"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validationrule_1 = require("./validationrule");
const ruleevent_1 = require("./ruleevent");
const output_1 = require("../utils/output");
class JSONValidator {
    static validate(json) {
        let isValid = true;
        const rules = new Array();
        rules.push(new validationrule_1.IsObjectRule(json));
        rules.push(new validationrule_1.HasObjectKeyRule(json));
        rules.push(new validationrule_1.HasIdAttributeRule(json));
        output_1.Output.setInfo('ValidationRule:' +
            'Result'.padStart(60 - 'ValidationRule'.length) +
            'Message'.padStart(80));
        for (const rule of rules) {
            const results = rule.executeValidation();
            for (const result of results.events) {
                output_1.Output.setInfo(results.validationRule +
                    ':' +
                    result.result
                        .toString()
                        .padStart(60 - results.validationRule.length) +
                    result.message.padStart(80));
                if (result.result === ruleevent_1.RuleResultSeverity.ALERT) {
                    isValid = false;
                }
            }
        }
        return isValid;
    }
}
exports.JSONValidator = JSONValidator;
//# sourceMappingURL=json.validator.js.map