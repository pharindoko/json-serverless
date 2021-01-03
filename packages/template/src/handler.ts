import { APIGatewayProxyHandlerV2, APIGatewayProxyEventV2 } from 'aws-lambda';
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
  AuthStrategy,
  ApiKeyStrategy,
  PublicStrategy,
} from 'json-serverless-lib';
import fs from 'fs';
import * as AWS from 'aws-sdk';
AWS.config.update({ region: process.env.region });

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
  appConfig.routes.apiRoutePath,
  './package.json',
  appConfig.routes.swaggerSpecRoutePath
);

const getParameter = async (key: string): Promise<string> => {
  try {
    const ssm = new AWS.SSM();
    const result = await ssm
      .getParameter({
        Name: key,
        WithDecryption: true,
      })
      .promise();
    return (result.$response.data as AWS.SSM.GetParameterResult).Parameter!
      .Value!;
  } catch (error) {
    throw new Error(
      'Cannot request SSM Parameter Value for ' +
        process.env.authPath +
        ' - please ensure that key is available in AWS SSM - further details: ' +
        error.message
    );
  }
};

let core: CoreApp | undefined;
const init = async () => {
  const authStrategy: AuthStrategy = appConfig.enableApiKeyAuth
    ? new ApiKeyStrategy(server, await getParameter(process.env.authPath!))
    : new PublicStrategy();
  if (process.env.IS_OFFLINE) {
    core = new CoreApp(
      appConfig,
      server,
      new FileStorageAdapter('db.json'),
      swagger,
      environment,
      authStrategy
    );
  } else {
    core = new CoreApp(
      appConfig,
      server,
      new S3StorageAdapter(environment.s3Bucket, environment.s3File),
      swagger,
      environment,
      authStrategy
    );
  }

  await core!.setup();
};
const initPromise = init();

export const handler: APIGatewayProxyHandlerV2 = async (
  event: APIGatewayProxyEventV2,
  context
) => {
  await initPromise;
  const result = await sls(event, context);
  return result;
};
