import { Logger } from './logger';

export class Output {
  static setWarning(message: string) {
    Logger.getInstance().warning(message);
  }
  static setError(message: string) {
    Logger.getInstance().error(message);
  }
  static setInfo(message: string) {
    Logger.getInstance().info(message);
  }
}
