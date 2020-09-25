import express from 'express';
import {
  AppConfig,
  Swagger,
  SwaggerConfig,
  CoreApp,
  FileStorageAdapter,
  Environment,
} from '../index';
import { AuthStrategy } from '../auth/auth.strategy';
import { ApiKeyStrategy } from '../auth/apikey.strategy';
import { PublicStrategy } from '../auth/public.strategy';

const server = express();
const appConfig = new AppConfig();
appConfig.enableApiKeyAuth = true;

const environment = new Environment();
const swagger = new Swagger(
  server,
  new SwaggerConfig(appConfig.readOnly, appConfig.enableApiKeyAuth),
  environment.basePath,
  appConfig.routes.apiRoutePath,
  './package.json',
  appConfig.routes.swaggerSpecRoutePath
);
const authKey = 'ac540ece-d81d-4e58-9979-0207401a2da5';
const authStrategy: AuthStrategy = appConfig.enableApiKeyAuth
  ? new ApiKeyStrategy(server, authKey)
  : new PublicStrategy();
let core: CoreApp | undefined;
core = new CoreApp(
  appConfig,
  server,
  new FileStorageAdapter('db.json'),
  swagger,
  environment,
  authStrategy
);

const init = async () => {
  await core!.setup();
  console.log(
    'JSON Server is running under port 3000. Use http://localhost:3000/ to access it'
  );
  if (appConfig.enableApiKeyAuth) {
    console.log(
      'Add header value {"authorization": "' + authKey + '"} to your requests'
    );
  }
  server.listen(3000);
};
init();
