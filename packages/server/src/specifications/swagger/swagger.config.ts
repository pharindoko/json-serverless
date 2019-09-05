export class SwaggerConfig {
  readOnly = false;
  enableApiKeyAuth = false;

  constructor(readOnly: boolean, enableApiKeyAuth: boolean) {
    this.readOnly = readOnly;
    this.enableApiKeyAuth = enableApiKeyAuth;
  }
}
