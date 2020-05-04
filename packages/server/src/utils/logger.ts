import * as pino from 'pino';

export class Logger {
  private static instance: pino.Logger;
  private constructor() {}

  static init() {
    Logger.instance = pino.default(process.stderr);
  }

  static getInstance(): pino.Logger {
    if (!Logger.instance) {
      return (Logger.instance = pino.default(process.stderr));
    }
    return Logger.instance;
  }
}
