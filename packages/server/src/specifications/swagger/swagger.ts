import { SwaggerSpec } from './swaggerspec';
import { SwaggerDefGen } from './swagger.defgen';
import express from 'express';
import { Spec, ApiKeySecurity } from 'swagger-schema-official';
import { SwaggerConfig } from './swagger.config';
import { ApiSpecification } from '../apispecification';
import { Output } from '../../utils/output';

export class Swagger implements ApiSpecification {
  private swaggerSpec: SwaggerSpec;
  private swaggerDefGen = new SwaggerDefGen();
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

  generateSpecification = (json: object): object => {
    Output.setInfo('Init Swagger');
    const swaggerSchemaDefinitions = this.swaggerDefGen.generateDefinitions(
      json
    );
    const spec: Spec = this.swaggerSpec.getSpec(
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
      this.swaggerSpec.addAuthentication(spec, auth);
    }
    this.swaggerSpec.addSchemaDefitions(spec, swaggerSchemaDefinitions);
    return spec;
  };
}
