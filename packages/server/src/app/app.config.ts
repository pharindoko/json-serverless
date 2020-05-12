export class AppConfig {
  readOnly = false;
  enableApiKeyAuth = false;
  jsonFile = 'db.json';
  enableJSONValidation = true;
  enableSwagger = true;
  stackName = 'jsonsls';
  static merge = <T, U>(t: T, u: U) => Object.assign({}, t, u);
}
