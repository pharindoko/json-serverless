export class AppConfig {
  readOnly = false;
  enableApiKeyAuth = false;
  jsonFile = 'db.json';
  enableJSONValidation = true;
  enableSwagger = true;
  logLevel = LogLevel.info;
  stackName = 'jsonsls';
  routes = new AppRoutes();
  static merge = <T, U>(t: T, u: U) => Object.assign({}, t, u);
}

export class AppRoutes {
  apiRoutePath = '/api';
  swaggerUIRoutePath = '/ui';
  swaggerSpecRoutePath = '/api-spec';
  graphqlRoutePath = '/graphql';
}

export enum LogLevel {
  info = 'info',
  debug = 'debug',
}
