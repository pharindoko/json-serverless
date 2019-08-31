import * as swaggerUi from 'swagger-ui-express';
import { SwaggerSpec } from './swagger.spec';
import { SwaggerDefGen } from './swagger.defgen';
import { Logger } from '../../utils/logger';
import express from 'express';
import { Spec, ApiKeySecurity } from 'swagger-schema-official';
import { SwaggerConfig } from './swagger.config';
import { ApiSpecification } from '../apispecification';

export class Swagger implements ApiSpecification {
  private swaggerSpec = new SwaggerSpec();
  private swaggerDefGen = new SwaggerDefGen();
  private logger = new Logger().logger;
  private spec = {} as Spec;
  private server: express.Express;
  private config: SwaggerConfig;
  private basePath: string;
  constructor(
    server: express.Express,
    config: SwaggerConfig,
    basePath: string
  ) {
    this.server = server;
    this.config = config;
    this.basePath = basePath;
  }

  generateSpecification = (json: object, regenerate: boolean) => {
    if (!this.spec || regenerate) {
      this.logger.info('init Swagger ');
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
    this.server.use('/api-spec', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(this.spec);
    });
    this.server.use('/', swaggerUi.serve, swaggerUi.setup(this.spec));
  };
}
