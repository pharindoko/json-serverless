import { APIGatewayProxyHandler } from 'aws-lambda';
import express from 'express';
import serverlessHttp from 'serverless-http';
import { ServerFactory } from './factory';
import { AppConfig } from './config';
import fs from 'fs';
import { CloudApp } from './app';
const server = express();
const sls = serverlessHttp(server);
const appConfig: AppConfig = JSON.parse(
  fs.readFileSync('./config/appconfig.json', 'UTF-8')
);
const core = new CloudApp(appConfig, server);

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  await core.request();
  const result = await sls(event, _context);
  return result;
};
(async () => {
  if (require.main === module) {
    ServerFactory.createServer(
      process.env.NODE_ENV as string,
      server,
      appConfig
    );
  }
})();
