import { RuleEvent, RuleEventList } from './ruleevent';
export declare abstract class ValidationRule {
    protected jsonObject: object;
    ruleEvents: RuleEvent[];
    constructor(jsonObject: {});
    events: string[];
    executeValidation(): RuleEventList;
    protected abstract validate(): RuleEvent[];
}
export declare class IsObjectRule extends ValidationRule {
    validate(): RuleEvent[];
}
export declare class HasObjectKeyRule extends ValidationRule {
    validate(): RuleEvent[];
}
export declare class HasIdAttributeRule extends ValidationRule {
    validate(): RuleEvent[];
}
