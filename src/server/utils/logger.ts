import * as pino from 'pino';

export class Logger {
  private static instance: pino.Logger;
  private constructor() { }

  public static init(prettyPrint = false){
    Logger.instance = pino.default({
      prettyPrint: prettyPrint
    },
    process.stderr
  );
 }

  static getInstance():pino.Logger {
      if (!Logger.instance) {
        return Logger.instance = pino.default({
          prettyPrint: false
        },
        process.stderr
      );
      }
      return Logger.instance;
      
  }
}