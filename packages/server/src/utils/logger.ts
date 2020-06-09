import * as pino from 'pino';
import { LogLevel } from '../app/app.config';

export class Logger {
  private static instance: pino.Logger;
  private constructor() {}

  static init(logLevel: LogLevel) {
    Logger.instance = pino.default(
      { level: logLevel.toString() },
      process.stderr
    );
  }

  static getInstance(): pino.Logger {
    if (!Logger.instance) {
      return (Logger.instance = pino.default(process.stderr));
    }
    return Logger.instance;
  }
}
