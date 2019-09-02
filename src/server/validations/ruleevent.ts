export class RuleEventList {
  validationRule?: string;
  events = new Array<RuleEvent>();
}

export class RuleEvent {
  result: RuleResultSeverity;
  message = "" as string;

  constructor(result: RuleResultSeverity, message?: string) {
    this.result = result;
    this.message = message !== undefined ? message: "";
  }
}

export enum RuleResultSeverity {
  OK = 'OK',
  WARNING = 'WARNING',
  ALERT = 'ALERT',
}
