import express from 'express';
import {
  AppConfig,
  CoreApp,
  Environment,
  PublicStrategy,
  Swagger,
  SwaggerConfig,
} from '../index';
import { AzureFileShareStorageAdapter } from '../storage/azure.fileshare.storage';

const azureStorageConnectionString =
  process.env.AZURE_STORAGE_CONNECTION_STRING;
const server = express();
const appConfig = new AppConfig();
const environment = new Environment();

const swagger = new Swagger(
  server,
  new SwaggerConfig(appConfig.readOnly, appConfig.enableApiKeyAuth),
  environment.basePath,
  appConfig.routes.apiRoutePath,
  './package.json',
  appConfig.routes.swaggerSpecRoutePath
);

const core = new CoreApp(
  appConfig,
  server,
  new AzureFileShareStorageAdapter(
    azureStorageConnectionString,
    'newshare1610905628625',
    'newdirectory1610905628953',
    appConfig.jsonFile
  ),
  swagger,
  environment,
  new PublicStrategy()
);

const init = async () => {
  await core!.setup().catch(e => {
    console.error(e.message);
  });
  console.log(
    'JSON Server is running under port 3000. Use http://localhost:3000/  to access it'
  );

  server.listen(3000);
};

init();
