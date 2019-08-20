
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerspec');
const swaggerDefGen = require('./swagdefgen');
const { logger } = require('../logger');

module.exports.generateSwagger = (server, json, config) => {
  logger.info('init Swagger');
  const swaggerSchemaDefinitions = swaggerDefGen.generateDefinitions(json);
  const spec = swaggerSpec.getSpec(server, {}, config.readOnly);
  const auth = {
    securityDefinitions: {
      apiKeyHeader: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
        description: 'All requests must include the `x-api-key` header containing your account ID.',
      },
    },
  };
  if (config.enableApiKeyAuth) {
    swaggerSpec.addAuthentication(spec, auth);
  }
  swaggerSpec.addSchemaDefitions(spec, swaggerSchemaDefinitions);

  server.use('/api-spec', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(spec, null, 2);
    return next();
  });
  server.use('/api-docs', swaggerUi.serve, (req, res) => {
    swaggerUi.setup(spec)(req, res);
  });
};
