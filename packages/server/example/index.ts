import express from 'express';
import {
  AppConfig,
  Swagger,
  SwaggerConfig,
  CoreApp,
  FileStorageAdapter,
  Environment,
} from '../src/index';

const server = express();
const appConfig = new AppConfig();

const environment = new Environment();
const swagger = new Swagger(
  server,
  new SwaggerConfig(appConfig.readOnly, appConfig.enableApiKeyAuth),
  environment.basePath,
  appConfig.routes.apiRoutePath,
  './package.json'
);

let core: CoreApp | undefined;
core = new CoreApp(
  appConfig,
  server,
  new FileStorageAdapter('db.json'),
  swagger,
  environment
);

const init = async () => {
  await core!.setup();
  console.log(
    'JSON Server is running under port 3000. Use http://localhost:3000/ to access it'
  );
  server.listen(3000);
};
const initPromise = init();
