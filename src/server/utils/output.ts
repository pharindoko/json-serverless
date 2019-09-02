import { Logger } from './logger';

export class Output {
  static setWarning(message: string) {
    new Logger().logger.warning(message);
  }
  static setError(message: string) {
    new Logger().logger.error(message);
  }
  static setInfo(message: string) {
    new Logger().logger.info(message);
  }
}
