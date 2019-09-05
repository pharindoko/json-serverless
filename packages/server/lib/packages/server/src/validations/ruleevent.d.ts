export declare class RuleEventList {
    validationRule?: string;
    events: RuleEvent[];
}
export declare class RuleEvent {
    result: RuleResultSeverity;
    message: string;
    constructor(result: RuleResultSeverity, message?: string);
}
export declare enum RuleResultSeverity {
    OK = "OK",
    WARNING = "WARNING",
    ALERT = "ALERT"
}
