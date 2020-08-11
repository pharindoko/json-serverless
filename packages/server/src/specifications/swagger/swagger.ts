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
  private apiRoutePath: string;
  private specPath: string;
  constructor(
    server: express.Express,
    config: SwaggerConfig,
    basePath: string,
    apiRoutePath: string,
    packageJsonFilePath: string,
    specPath: string
  ) {
    this.server = server;
    this.config = config;
    this.basePath = basePath;
    this.apiRoutePath = apiRoutePath;
    this.swaggerSpec = new SwaggerSpec(packageJsonFilePath);
    this.specPath = specPath;
  }

  generateSpecification = (json: object): object => {
    Output.setDebugInfo('Init Swagger');
    const swaggerSchemaDefinitions = this.swaggerDefGen.generateDefinitions(
      json
    );
    const spec: Spec = this.swaggerSpec.getSpec(
      this.server,
      {},
      this.config.readOnly,
      this.basePath,
      this.apiRoutePath,
      this.specPath
    );

    if (this.config.enableApiKeyAuth) {
      const auth: ApiKeySecurity = {
        type: 'apiKey',
        in: 'header',
        name: 'authorization',
        description:
          'All requests must include the `authorization` header containing your apikey.',
      };
      this.swaggerSpec.addAuthentication(spec, auth);
    }
    this.swaggerSpec.addSchemaDefitions(spec, swaggerSchemaDefinitions);
    return spec;
  };
}
