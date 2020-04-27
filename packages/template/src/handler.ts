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

const core = new CoreApp(
  appConfig,
  server,
  new S3StorageAdapter(environment.s3Bucket, environment.s3File),
  swagger,
  environment
);

export const handler: APIGatewayProxyHandler = async (event, context) => {
  await core.setup();
  const result = await sls(event, context);
  return result;
};
