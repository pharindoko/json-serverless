import express from 'express';
import {
  AppConfig,
  Swagger,
  SwaggerConfig,
  CoreApp,
  FileStorageAdapter,
  Environment,
} from 'json-serverless-lib';

const server = express();
const appConfig = new AppConfig();

const environment = new Environment();
const swagger = new Swagger(
  server,
  new SwaggerConfig(appConfig.readOnly, appConfig.enableApiKeyAuth),
  environment.basePath,
  appConfig.apiRoutePath,
  './package.json'
);

let core = new CoreApp(
  appConfig,
  server,
  new FileStorageAdapter('db.json'),
  swagger,
  environment
);

const init = async () => {
  await core!.setup();
  console.log('JSON Server is running under port 3000.');

  console.log('#####################################');
  console.log('swagger-ui: ' + 'http://localhost:3000/ui');
  console.log('graphql: ' + 'http://localhost:3000/graphql');
  console.log('swagger-api-spec: ' + 'http://localhost:3000/graphql');

  server.listen(3000);
};
init();
