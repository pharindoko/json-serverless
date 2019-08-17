
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerspec');
const swaggerDefGen = require('./swagdefgen');

module.exports.generateSwagger = (server, json) => {
  const swaggerSchemaDefinitions = swaggerDefGen.generateDefinitions(json);
  const spec = swaggerSpec.getSpec(server, {});
  swaggerSpec.addSchemaDefitions(spec, swaggerSchemaDefinitions);


  const auth = {
    securityDefinitions: {
      accountId: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
        description: 'All requests must include the `x-api-key` header containing your account ID.',
      },
    },
  };

  swaggerSpec.addAuthentication(spec, auth);
  server.use(`${swaggerSpec.getPackageInfo().baseUrlPath}/api-spec`, (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(spec, null, 2);
    return next();
  });
  server.use(`${swaggerSpec.getPackageInfo().baseUrlPath}/api-docs`, swaggerUi.serve, (req, res) => {
    swaggerUi.setup(spec)(req, res);
  });
};
