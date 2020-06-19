export class AppConfig {
  readOnly = false;
  enableApiKeyAuth = false;
  jsonFile = 'db.json';
  enableJSONValidation = true;
  enableSwagger = true;
  logLevel = LogLevel.info;
  stackName = 'jsonsls';
  basePath = '/api';
  static merge = <T, U>(t: T, u: U) => Object.assign({}, t, u);
}

export enum LogLevel {
  info = 'info',
  debug = 'debug',
}
