"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RuleEventList {
    constructor() {
        this.events = new Array();
    }
}
exports.RuleEventList = RuleEventList;
class RuleEvent {
    constructor(result, message) {
        this.message = '';
        this.result = result;
        this.message = message !== undefined ? message : '';
    }
}
exports.RuleEvent = RuleEvent;
var RuleResultSeverity;
(function (RuleResultSeverity) {
    RuleResultSeverity["OK"] = "OK";
    RuleResultSeverity["WARNING"] = "WARNING";
    RuleResultSeverity["ALERT"] = "ALERT";
})(RuleResultSeverity = exports.RuleResultSeverity || (exports.RuleResultSeverity = {}));
//# sourceMappingURL=ruleevent.js.map