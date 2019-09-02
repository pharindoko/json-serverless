export class AppConfig {
  readOnly = false;
  enableSwagger = true;
  enableApiKeyAuth = false;
  jsonFile = 'db.json';
  enableJSONValidation = true;

  static merge = <T, U>(t: T, u: U) => Object.assign({}, t, u);
}
