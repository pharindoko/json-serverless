import { APIGatewayProxyHandler } from 'aws-lambda';
import express from 'express';
import serverlessHttp from 'serverless-http';
import {
  AppConfig,
  Swagger,
  SwaggerConfig,
  S3StorageAdapter,
  CloudEnvironment,
  CoreApp,
  FileStorageAdapter,
} from 'json-serverless-lib';

import fs from 'fs';

const server = express();
const sls = serverlessHttp(server);
const defaultConfig = new AppConfig();
const config = JSON.parse(fs.readFileSync('./config/appconfig.json', 'UTF-8'));
const appConfig = AppConfig.merge(defaultConfig, config);
const environment = new CloudEnvironment();
const swagger = new Swagger(
  server,
  new SwaggerConfig(appConfig.readOnly, appConfig.enableApiKeyAuth),
  environment.basePath,
  './package.json'
);

let core: CoreApp | undefined;
if (process.env.IS_OFFLINE) {
  core = new CoreApp(
    appConfig,
    server,
    new FileStorageAdapter('db.json'),
    swagger,
    environment
  );
} else {
  core = new CoreApp(
    appConfig,
    server,
    new S3StorageAdapter(environment.s3Bucket, environment.s3File),
    swagger,
    environment
  );
}

const init = async () => {
  return new Promise(async (resolve, reject) => {
    await core!.setup();
    resolve();
  });
};
const initPromise = init();

export const handler: APIGatewayProxyHandler = async (event, context) => {
  await initPromise;
  const result = await sls(event, context);
  return result;
};
