import * as swaggerUi from 'swagger-ui-express';
import { SwaggerSpec } from './swaggerspec';
import { SwaggerDefGen } from './swagdefgen';
import { Logger } from '../logger';
import express from 'express';
import { Spec, ApiKeySecurity } from 'swagger-schema-official';
import { AppConfig } from '../config';

export class Swagger {
  private swaggerSpec = new SwaggerSpec();
  private swaggerDefGen = new SwaggerDefGen();
  private logger = new Logger().logger;
  private spec = {} as Spec;
  generateSwagger = (
    server: express.Express,
    json: object,
    config: AppConfig,
    force: boolean
  ) => {
    if (!this.spec || force) {
      this.logger.info('init Swagger ');
      const swaggerSchemaDefinitions = this.swaggerDefGen.generateDefinitions(
        json
      );
      this.spec = this.swaggerSpec.getSpec(server, {}, config.readOnly);
      const auth: ApiKeySecurity = {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
        description:
          'All requests must include the `x-api-key` header containing your account ID.',
      };

      if (config.enableApiKeyAuth) {
        this.swaggerSpec.addAuthentication(this.spec, auth);
      }
      this.swaggerSpec.addSchemaDefitions(this.spec, swaggerSchemaDefinitions);
    }
    server.use('/api-spec', (req, res) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(this.spec);
    });
    server.use('/', swaggerUi.serve, swaggerUi.setup(this.spec));
  };
}
