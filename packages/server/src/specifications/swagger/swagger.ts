import { SwaggerSpec } from './swaggerspec';
import { SwaggerDefGen } from './swagger.defgen';
import { Logger } from '../../utils/logger';
import express from 'express';
import { Spec, ApiKeySecurity } from 'swagger-schema-official';
import { SwaggerConfig } from './swagger.config';
import { ApiSpecification } from '../apispecification';
import { Output } from '../../utils/output';

export class Swagger implements ApiSpecification {
  private swaggerSpec: SwaggerSpec;
  private swaggerDefGen = new SwaggerDefGen();
  private spec = {} as Spec;
  private server: express.Express;
  private config: SwaggerConfig;
  private basePath: string;
  constructor(
    server: express.Express,
    config: SwaggerConfig,
    basePath: string,
    packageJsonFilePath: string
  ) {
    this.server = server;
    this.config = config;
    this.basePath = basePath;
    this.swaggerSpec = new SwaggerSpec(packageJsonFilePath);
  }

  generateSpecification = (json: object, regenerate: boolean): object => {
    if (!this.spec || regenerate) {
      Output.setInfo('Init Swagger');
      const swaggerSchemaDefinitions = this.swaggerDefGen.generateDefinitions(
        json
      );
      this.spec = this.swaggerSpec.getSpec(
        this.server,
        {},
        this.config.readOnly,
        this.basePath
      );
      const auth: ApiKeySecurity = {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
        description:
          'All requests must include the `x-api-key` header containing your account ID.',
      };

      if (this.config.enableApiKeyAuth) {
        this.swaggerSpec.addAuthentication(this.spec, auth);
      }
      this.swaggerSpec.addSchemaDefitions(this.spec, swaggerSchemaDefinitions);
    }
    return this.spec;
  };
}
